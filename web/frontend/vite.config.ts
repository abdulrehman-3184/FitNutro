import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    // Docker on Windows doesn't forward file-change events into containers
    watch: { usePolling: process.env.CHOKIDAR_USEPOLLING === 'true' },
  },
})
