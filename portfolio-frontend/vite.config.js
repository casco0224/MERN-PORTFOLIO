import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Configuración de Vite
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias para simplificar rutas
    },
  },
  server: {
    port: 3001, // Configura el puerto 3000 para el frontend
    open: true, // Abre automáticamente el navegador al iniciar el servidor
  },
});
