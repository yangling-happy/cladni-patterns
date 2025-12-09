import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 必须是「仓库名/」，末尾的 / 不能少！
  base: "/cladni-patterns/", 
  build: {
    outDir: "dist",
    emptyOutDir: true, // 构建前清空 dist，避免旧文件干扰
    rollupOptions: {
      output: {
        // 强制生成固定命名（可选，方便排查）
        entryFileNames: `assets/index.js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});