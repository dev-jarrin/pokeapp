const CACHE_NAME = "my-app-cache-v1";

const urlsToCache = ["/"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-app-cache-v2").then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.clients.claim(),
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName.startsWith("my-app-cache-") &&
            cacheName !== "my-app-cache-v2"
          ) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  alert("Install this app on your home screen!");
});
  