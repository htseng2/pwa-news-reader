import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { injectManifest } from "workbox-build";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "workbox",
      apply: "build",
      closeBundle: async () => {
        await injectManifest({
          swSrc: "src/service-worker.js",
          swDest: "dist/service-worker.js",
          globDirectory: "dist",
          globPatterns: ["**/*.{html,js,css,png,jpg,svg}"],
          // Ensure the generated service worker doesn't exceed size limit
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
        });
      },
    },
  ],
  // Remove the rollupOptions config since we're using the plugins array directly
});
