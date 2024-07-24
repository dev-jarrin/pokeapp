import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Pokemon App",
        short_name: "pokeApp",
        description:
          "Pokemon details application Where you get Everything about pokemons",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        prefer_related_applications: true,
        icons: [
          {
            src: "assets/images/icon.jpeg",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
