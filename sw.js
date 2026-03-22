// Record Chief Service Worker — Auto-update version
// Change this version string every time you deploy
const VERSION = "v" + "20260318";
const CACHE   = "recordchief-" + VERSION;

const CDN = [
  "https://unpkg.com/react@18/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
];

// Install — cache CDN libs, skip waiting so new SW activates immediately
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.allSettled(CDN.map(u => c.add(u).catch(() => {})))
    )
  );
  self.skipWaiting(); // activate immediately, don't wait for old tabs to close
});

// Activate — delete every old cache version, then take control
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim()) // take control of all open tabs right now
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (e.request.url.startsWith("chrome-extension")) return;

  const url  = new URL(e.request.url);
  const isCDN = url.hostname.includes("unpkg.com") ||
                url.hostname.includes("cdnjs")      ||
                url.hostname.includes("fonts.googleapis");

  const isAppFile = url.pathname === "/" ||
                    url.pathname.endsWith(".html") ||
                    url.pathname.endsWith(".js")   ||
                    url.pathname.endsWith(".json");

  if (isCDN) {
    // CDN: cache-first (React/fonts never change)
    e.respondWith(
      caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
        if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }))
    );
  } else if (isAppFile) {
    // App files: network-first so updates always show
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        })
        .catch(() => caches.match(e.request)) // offline fallback
    );
  } else {
    // Everything else: network with cache fallback
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
  }
});

// Listen for SKIP_WAITING message from the page
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
