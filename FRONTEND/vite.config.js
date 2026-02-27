import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: env.BACKEND_URL || 'http://localhost:3000',
          changeOrigin: true
        },
      },
    },
    build: {
      outDir: 'dist', // Standardize output dir for hosts like Render/Vercel
    }
  };
});
