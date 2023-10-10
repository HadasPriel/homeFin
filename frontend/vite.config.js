import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // viteTsconfigPaths(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  build: {
    outDir: '../backend/public',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});