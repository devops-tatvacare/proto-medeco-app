"use client";

import { useState } from "react";

type HttpMethod = "GET" | "POST";

const DEFAULT_PATH = "health";

export function McpStatusChecker() {
  const [path, setPath] = useState(DEFAULT_PATH);
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const normalizedPath = path.replace(/^\/+/, "");
      const res = await fetch(`/api/mcp/${normalizedPath}`, {
        method,
        headers:
          method === "POST"
            ? { "Content-Type": "application/json" }
            : undefined,
        body: method === "POST" && body ? body : undefined,
      });

      const text = await res.text();
      const formatted = [
        `Status: ${res.status}`,
        `URL: ${res.url}`,
        "",
        text || "<empty response>",
      ]
        .filter(Boolean)
        .join("\n");

      setResponse(formatted);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to reach the proxy endpoint.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur md:p-8 dark:border-zinc-800 dark:bg-zinc-900/70 dark:ring-white/10">
      <div className="mb-6 space-y-2">
        <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Quick Check
        </p>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Verify the MCP proxy
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Send a quick request through <code className="font-mono">/api/mcp</code>{" "}
          to confirm that your locally running Figma MCP server is reachable.
          Adjust the path if your server exposes a different health endpoint.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <label className="flex flex-col text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Path
            <input
              type="text"
              value={path}
              onChange={(event) => setPath(event.target.value)}
              className="mt-1 w-48 rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm text-zinc-900 shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white dark:focus:ring-white/10"
              placeholder="health"
            />
          </label>

          <label className="flex flex-col text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Method
            <select
              value={method}
              onChange={(event) => setMethod(event.target.value as HttpMethod)}
              className="mt-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white dark:focus:ring-white/10"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </label>
        </div>

        {method === "POST" && (
          <label className="flex flex-col text-sm font-medium text-zinc-700 dark:text-zinc-200">
            JSON Body (optional)
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              className="mt-1 h-28 rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white dark:focus:ring-white/10"
              placeholder='{"prompt":"Hello MCP"}'
            />
          </label>
        )}

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          disabled={!path.trim() || isLoading}
        >
          {isLoading ? "Checking…" : "Send test request"}
        </button>
      </form>

      <div className="mt-6 space-y-2">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Response
        </p>
        <pre className="max-h-64 overflow-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
          <code className="block whitespace-pre-wrap">
            {error && <span className="text-red-500">{error}</span>}
            {!error && response}
            {!error && !response && "Run a request to see the response here."}
          </code>
        </pre>
      </div>
    </section>
  );
}
