import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    hmr: {
      port: process.env.WDS_SOCKET_PORT ? parseInt(process.env.WDS_SOCKET_PORT) : 3000,
    },
  },
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  },
  clearScreen: false,
});
