import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Définit un port fixe
    strictPort: true, // Empêche Vite de changer de port si 3000 est occupé
  }
})
