import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/cladni-patterns/", // 和 homepage 保持一致
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});