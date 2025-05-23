// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // ✅ tells Vitest to simulate a DOM
    globals: true, // ✅ allows you to use `describe`, `it`, etc. without importing
    setupFiles: "./setupTests.ts", // optional: for global setup
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"], // Only include .test.ts and .test.tsx files
    exclude: ["**/*.spec.ts"], // Exclude Playwright tests
  },
});
