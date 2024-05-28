import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { defineConfig as viteDefineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(
  viteDefineConfig({
    plugins: [tsconfigPaths(), react()],
    server: {
      host: true,
    },
  })
);
