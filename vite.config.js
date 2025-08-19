import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Almacen2025/',   // nombre EXACTO del repo
  plugins: [react()],
})
