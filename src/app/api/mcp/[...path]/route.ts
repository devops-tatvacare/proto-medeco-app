import { NextRequest, NextResponse } from "next/server";

const MCP_BASE_URL = process.env.FIGMA_MCP_SERVER_URL;

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "content-length",
  "host",
]);

const METHODS_WITHOUT_BODY = new Set(["GET", "HEAD"]);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function proxyRequest(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> },
) {
  const params = await context.params;
  if (!MCP_BASE_URL) {
    return NextResponse.json(
      {
        error:
          "FIGMA_MCP_SERVER_URL is not configured. Add it to your .env.local file (see .env.local.example).",
      },
      { status: 500 },
    );
  }

  const targetUrl = buildTargetUrl(MCP_BASE_URL, params.path, request);

  const init: RequestInit = {
    method: request.method,
    headers: filterHeaders(request.headers),
    redirect: "manual",
  };

  if (!METHODS_WITHOUT_BODY.has(request.method.toUpperCase())) {
    const buffer = await request.arrayBuffer();
    if (buffer.byteLength > 0) {
      init.body = buffer;
    }
  }

  const upstreamResponse = await fetch(targetUrl, init);

  const responseHeaders = new Headers(upstreamResponse.headers);
  for (const hopByHopHeader of HOP_BY_HOP_HEADERS) {
    responseHeaders.delete(hopByHopHeader);
  }
  responseHeaders.set("x-proxied-by", "nextjs-mcp-proxy");

  return new NextResponse(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
}

function buildTargetUrl(
  baseUrl: string,
  pathSegments: string[] | undefined,
  request: NextRequest,
) {
  const normalizedBase = baseUrl.endsWith("/")
    ? baseUrl
    : `${baseUrl}/`;
  const joinedPath = pathSegments?.length
    ? pathSegments.join("/")
    : "";
  const url = new URL(joinedPath, normalizedBase);

  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  return url;
}

function filterHeaders(incoming: Headers) {
  const headers = new Headers();

  incoming.forEach((value, key) => {
    if (HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      return;
    }
    headers.set(key, value);
  });

  return headers;
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
