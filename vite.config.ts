import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { config } from 'dotenv'
import { resolve } from 'path'

config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': {
        target: process.env.SORTER_INSTANCE,
        headers: process.env.TOKEN ? { 'Authorization': process.env.TOKEN } : undefined,
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        codes: resolve(__dirname, 'codes/index.html'),
        attachments: resolve(__dirname, 'attachments/index.html'),
      }
    }
  }
})
