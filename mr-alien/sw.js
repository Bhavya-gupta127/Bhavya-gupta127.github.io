// Mr. Alien — PWA Service Worker v12.0
const CACHE_NAME = "mr-alien-pwa-v12";
const ASSETS = [
  "/mr-alien/",
  "/mr-alien/index.html",
  "/mr-alien/styles.min.css?v=12",
  "/mr-alien/app.min.js?v=12",
  "/mr-alien/manifest.json",
  "/mr-alien/icon-192.png",
  "/mr-alien/icon-512.png",
  "/mr-alien/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith("mr-alien-pwa-") && k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/api/")) {
    return;
  }
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res && res.status === 200 && url.origin === self.location.origin) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("/mr-alien/index.html")))
  );
});
