// Placeholder for service worker lifecycle events

self.addEventListener('install', event => {
  // Perform install steps (e.g., cache assets)
  console.log('[ServiceWorker] Install');
});

self.addEventListener('activate', event => {
  // Cleanup old caches, etc.
  console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', event => {
  // Intercept network requests
  console.log('[ServiceWorker] Fetch', event.request.url);
});