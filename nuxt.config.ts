// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  css: ['~/tailwind.css'],
  plausible: {
    // Prevent tracking on localhost
    ignoredHostnames: ['localhost'],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
