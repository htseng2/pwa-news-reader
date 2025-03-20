// Use importScripts to import workbox-sw (will be handled by the build process)
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js"
);

// Use workbox global variable now
workbox.setConfig({
  debug: false,
});

const { precacheAndRoute } = workbox.precaching;
const { registerRoute } = workbox.routing;
const { StaleWhileRevalidate } = workbox.strategies;

// Precache all assets generated by the build process
precacheAndRoute(self.__WB_MANIFEST);

// Cache API responses
registerRoute(
  ({ url }) => url.origin === "https://newsapi.org",
  new StaleWhileRevalidate({
    cacheName: "news-api-cache",
  })
);

// Cache images
registerRoute(
  ({ request }) => request.destination === "image",
  new StaleWhileRevalidate({
    cacheName: "image-cache",
  })
);
