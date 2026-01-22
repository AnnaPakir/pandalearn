import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pandalearn/',
  root: './', // Явно указываем, что всё лежит в корне
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html' // Указываем точку входа
    }
  }
})
