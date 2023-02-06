// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
  typescript: {
    shim: false,
  },
  googleFonts: {
    families: {
      Comfortaa: true,
      Montserrat: true,
    },
  },
});
