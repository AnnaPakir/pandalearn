import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Оставляем пустую строку или './', чтобы пути к картинкам и скриптам всегда были правильными
  base: './',
  build: {
    outDir: 'dist',
  }
})
