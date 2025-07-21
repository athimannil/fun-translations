import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./test-setup.ts"],
    globals: true, // This enables global expect, describe, it
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "./"),
    },
  },
});
