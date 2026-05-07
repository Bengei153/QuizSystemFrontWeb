import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/Auth': {
        target: 'http://localhost:7289/api',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
