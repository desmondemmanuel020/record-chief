// Record Chief Service Worker
const VERSION = "v20260319";
const CACHE   = "recordchief-" + VERSION;

// All resources to pre-cache on install
const PRECACHE = [
  "/",
  "/index.html",
  "/app.jsx",
  "https://unpkg.com/@babel/standalone@7.23.5/babel.min.js",
  "/manifest.json",
  "/icons/icon-32.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "https://unpkg.com/react@18/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
];

// ── Install: pre-cache everything ──
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.allSettled(PRECACHE.map(url =>
        c.add(url).catch(err => console.warn("Pre-cache failed:", url, err.message))
      ))
    ).then(() => self.skipWaiting())
  );
});

// ── Activate: clean old caches, take control ──
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: smart caching strategy ──
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (e.request.url.startsWith("chrome-extension")) return;

  const url = new URL(e.request.url);

  // Skip backend API calls — always go to network, don't cache
  if (url.hostname.includes("railway.app") ||
      url.pathname.startsWith("/api/")) {
    return; // let browser handle naturally
  }

  const isCDN = url.hostname.includes("unpkg.com") ||
                url.hostname.includes("cdnjs") ||
                url.hostname.includes("fonts.googleapis") ||
                url.hostname.includes("fonts.gstatic");

  const isAppFile = url.hostname === self.location.hostname && (
    url.pathname === "/" ||
    url.pathname.endsWith(".html") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".json") ||
    url.pathname.startsWith("/icons/")
  );

  if (isCDN) {
    // Cache-first for CDN — never changes
    e.respondWith(
      caches.match(e.request).then(hit => {
        if (hit) return hit;
        return fetch(e.request).then(res => {
          if (res && res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        }).catch(() => caches.match(e.request));
      })
    );
  } else if (isAppFile) {
    // Stale-while-revalidate for app files:
    // Serve from cache immediately (fast), update cache in background
    e.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(e.request).then(cached => {
          const networkFetch = fetch(e.request).then(res => {
            if (res && res.ok) cache.put(e.request, res.clone());
            return res;
          }).catch(() => null);

          // Return cached immediately if available, otherwise wait for network
          return cached || networkFetch;
        })
      )
    );
  } else {
    // Everything else: network with cache fallback
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res && res.ok && res.type !== "opaque") {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => {
          if (e.request.mode === "navigate") {
            return caches.match("/index.html");
          }
          return caches.match(e.request);
        })
    );
  }
});

// ── Message handler ──
self.addEventListener("message", e => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});
