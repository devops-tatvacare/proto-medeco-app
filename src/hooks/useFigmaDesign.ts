/**
 * useFigmaDesign Hook
 * Integrates with Figma MCP server to fetch design tokens dynamically
 * Falls back to hardcoded tokens if MCP is unavailable
 */

"use client";

import { useMemo, useState, useEffect } from "react";
import { designTokens } from "@/lib/design-tokens";
import { DesignTokens } from "@/types/figma";

interface UseFigmaDesignReturn {
  tokens: DesignTokens;
  isLoading: boolean;
  error: string | null;
  isMcpConnected: boolean;
}

export function useFigmaDesign(): UseFigmaDesignReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mcpTokens, setMcpTokens] = useState<DesignTokens | null>(null);
  const [isMcpConnected, setIsMcpConnected] = useState(false);

  useEffect(() => {
    // Attempt to fetch design tokens from MCP server
    async function fetchMcpTokens() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/mcp/design-tokens", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMcpTokens(data);
          setIsMcpConnected(true);
          console.log("[useFigmaDesign] MCP tokens loaded successfully");
        } else {
          throw new Error(`MCP server returned ${response.status}`);
        }
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Failed to connect to MCP";
        setError(errorMsg);
        setIsMcpConnected(false);
        console.warn(
          "[useFigmaDesign] MCP unavailable, using fallback tokens:",
          errorMsg
        );
      } finally {
        setIsLoading(false);
      }
    }

    // Uncomment to enable MCP fetching
    // fetchMcpTokens();

    // For now, we'll use the hardcoded tokens
    setIsMcpConnected(false);
  }, []);

  // Memoize tokens to prevent unnecessary re-renders
  const tokens = useMemo(() => {
    return mcpTokens || designTokens;
  }, [mcpTokens]);

  return {
    tokens,
    isLoading,
    error,
    isMcpConnected,
  };
}
