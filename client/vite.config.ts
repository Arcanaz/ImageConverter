import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    host: '0.0.0.0',  // Bind to all network interfaces so it's accessible outside the container
    port: 4173         // Make sure this matches the port you're using for the frontend
  }
})
