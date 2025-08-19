import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// MUY IMPORTANTE: el nombre EXACTO del repo
export default defineConfig({
  base: '/Almacen2025/',
  plugins: [react()],
})
