## Dr.Tatva HCP App - Home Page A1

This is a fully functional Next.js 16 + React 19 + TypeScript prototype of the Dr.Tatva Healthcare Professional platform, implementing the **"Home page A1"** design from Figma with **actual localhost image assets** from the Figma MCP server.

### ✅ Key Features

- **Real Figma Assets**: All images are served from `http://localhost:3845/assets/` via the Figma MCP server in LOCAL SERVER mode
- **Complete Component Library**: StatusBar, RemoteCareBanner, ServiceCard, RewardCard, AskTatvaCard, and Button components
- **Design System**: Extracted design tokens (colors, typography, spacing) from Figma
- **Production Ready**: TypeScript strict mode, fully typed components, successful build

### Prerequisites

- Node.js 18.18+ (Next.js 16 requirement)
- npm (bundled with Node) or another package manager
- A locally running Figma MCP server (see the [official repo](https://github.com/modelcontextprotocol/servers))

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and point it at your MCP server URL.

```bash
cp .env.local.example .env.local
# edit the file if your MCP server uses a different port
```

Environment variables:

| Name                         | Description                                                            |
| ---------------------------- | ---------------------------------------------------------------------- |
| `FIGMA_MCP_SERVER_URL`       | Base URL to the MCP server (used on the server/proxy).                 |
| `NEXT_PUBLIC_FIGMA_MCP_SERVER_URL` | Optional: used in the UI if you want to display the target URL to users. |

### 3. Run the local servers

Start the MCP server first, then boot the Next.js dev server:

```bash
# in the figma-mcp-server repo
npm run dev # or the script that starts your MCP server

# inside this repo
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the dashboard and send test requests through the proxy.

### Using the MCP proxy

The proxy lives under `http://localhost:3000/api/mcp/*`. Any request hitting this path will be forwarded to your MCP server with the remaining path appended.

Example health-check request (assuming your MCP server exposes `/health`):

```bash
curl http://localhost:3000/api/mcp/health
```

POST requests are also supported; they are forwarded with the original body and headers (minus hop-by-hop headers):

```bash
curl -X POST http://localhost:3000/api/mcp/messages \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Ping from Next.js"}'
```

### Available scripts

- `npm run dev` – start the Next.js dev server locally.
- `npm run build` – create an optimized production build.
- `npm run start` – run the production server (after `npm run build`).
- `npm run lint` – run ESLint on the codebase.

### Next steps

- Add UI that talks to the `/api/mcp` proxy (see `src/components/mcp-status-checker.tsx` for an example).
- If you expose new MCP endpoints, you only need to update the Figma server—no Next.js changes unless you add custom auth/headers.
- When ready to deploy, set the same environment variables on your hosting platform and ensure the MCP server is reachable from that environment.
