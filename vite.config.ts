import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Пустая строка '' или './' заставляет Vite использовать относительные пути,
  // что критически важно для работы на GitHub Pages в подпапках.
  base: '',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
