import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/auth': {
        target: 'http://localhost:8084',
        changeOrigin: true,
        secure: false,
      },
      '/Users': {
        target: 'http://localhost:8084',
        changeOrigin: true,
        secure: false,
      },
      '/hotels': {
        target: 'http://localhost:8084',
        changeOrigin: true,
        secure: false,
      },
      '/ratings': {
        target: 'http://localhost:8084',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
