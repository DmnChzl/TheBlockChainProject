import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "integration",
          include: ["test/integration/**/*.{test,spec}.ts"],
        },
      },
      {
        test: {
          name: "unit",
          include: ["test/unit/**/*.{test,spec}.ts"],
        },
      },
    ],
    environment: "node",
  },
});
