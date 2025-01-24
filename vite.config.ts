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
      '/api/sorter': {
        target: process.env.SORTER_URL,
        headers: process.env.SORTER_TOKEN ? { 'Authorization': process.env.SORTER_TOKEN } : undefined,
        changeOrigin: true,
        rewrite: path => path.replace(/sorter\//, ''),
      },
      '/api': {
        target: process.env.GRAPE_INSTANCE,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        codes: resolve(__dirname, 'codes/index.html'),
        attachments: resolve(__dirname, 'attachments/index.html'),
        messages: resolve(__dirname, 'messages/index.html'),
      }
    }
  }
})
