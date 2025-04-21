// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // ✅ tells Vitest to simulate a DOM
    globals: true, // ✅ allows you to use `describe`, `it`, etc. without importing
    setupFiles: "./setupTests.ts", // optional: for global setup
  },
});
