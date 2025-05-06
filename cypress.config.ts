import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.NEXT_PUBLIC_FRONT_URL || "http://localhost:3000",
    env: {
      backendUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000",
    },
    // video: true, // Activa la grabación de video
    // videoCompression: 32, // Nivel de compresión (0 = sin compresión)
    // videosFolder: "cypress/videos",
    chromeWebSecurity: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
