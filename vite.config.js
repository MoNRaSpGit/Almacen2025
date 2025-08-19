import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ Cambiá REPO_NAME por el nombre exacto del repo
export default defineConfig({
  base: '/Almacen2025/',
  plugins: [react()],
})
