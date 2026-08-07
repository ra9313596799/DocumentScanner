const CACHE_NAME = 'doc-scanner-cache-v1';
const urlsToCache = [
  '/DocumentScanner/?v4',
  '/DocumentScanner/index.html?v4',
  '/DocumentScanner/manifest.json?v4'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cache hit or fetch from network
        return response || fetch(event.request);
      })
  );
});