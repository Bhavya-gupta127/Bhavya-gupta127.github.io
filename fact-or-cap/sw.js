// Fact or Cap: Bluff Trivia — PWA Service Worker v3.0
const CACHE_NAME = "factorcap-pwa-v3";
const ASSETS = [
  "/fact-or-cap/",
  "/fact-or-cap/index.html",
  "/fact-or-cap/styles.min.css?v=3.0",
  "/fact-or-cap/app.min.js?v=3.0",
  "/fact-or-cap/manifest.json",
  "/fact-or-cap/icon-192.png",
  "/fact-or-cap/icon-512.png",
  "/fact-or-cap/apple-touch-icon.png"
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
          .filter((k) => k.startsWith("factorcap-pwa-") && k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/api/")) return;
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
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("/fact-or-cap/index.html")))
  );
});
