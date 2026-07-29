const CACHE_NAME = 'doc-scan-cache-v1';
const urlsToCache = [
  '/DocumentScanner/',
  '/DocumentScanner/index.html',
  '/DocumentScanner/manifest.json?v2'
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