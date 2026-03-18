// Record Chief Service Worker
// Strategy:
//   - app files (app.js, index.html): Network first → cache fallback (always get latest)
//   - CDN libs (React, fonts): Cache first → network fallback (they never change)

const CACHE_NAME = "recordchief-v3";

const CDN_ASSETS = [
  "https://unpkg.com/react@18/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
];

const APP_FILES = ["/", "/index.html", "/app.js", "/manifest.json"];

// Install — pre-cache CDN libs only
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(CDN_ASSETS.map(url => cache.add(url).catch(() => {})))
    )
  );
  self.skipWaiting();
});

// Activate — delete ALL old caches so stale app files are wiped
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch handler
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (e.request.url.startsWith("chrome-extension")) return;

  const url = new URL(e.request.url);
  const isAppFile = url.pathname === "/"
    || url.pathname.endsWith(".html")
    || url.pathname.endsWith(".js")
    || url.pathname.endsWith(".json");
  const isCDN = e.request.url.includes("unpkg.com") || e.request.url.includes("cdnjs") || e.request.url.includes("fonts.googleapis");

  if (isCDN) {
    // Cache first for CDN — they never change
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          }
          return res;
        });
      })
    );
  } else if (isAppFile) {
    // Network first for app files — always get the latest version
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // Default: network with cache fallback
    e.respondWith(
      fetch(e.request)
        .catch(() => {
          if (e.request.mode === "navigate") return caches.match("/index.html");
          return caches.match(e.request);
        })
    );
  }
});
