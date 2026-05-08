// Record Chief Service Worker — v10
// NO auto-reload on update. App updates on next natural page open.
const CACHE = 'rc-v10';

self.addEventListener('install', () => {
  // Don't skipWaiting — prevents the reload loop
  // New SW waits until all tabs close, then takes over naturally
});

self.addEventListener('activate', e => {
  // Clean old caches
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  // Take control of existing pages without reload
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Never cache these — always fetch fresh
  if (['/bundle.js', '/index.html', '/'].includes(url.pathname)) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Everything else: serve from cache, update in background
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(response => {
        if (response && response.status === 200 && response.type !== 'opaque') {
          const clone = response.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return response;
      }).catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
