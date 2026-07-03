// ClassTrack service worker
// Purpose: cache the app shell so it opens offline once installed/visited,
// and keep a worker alive that can show notifications scheduled by the page.
const CACHE_NAME = 'classtrack-v4-cache-1';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first for app shell files, network-first fallback for everything else
// (so a stale cached copy never blocks you from getting a fresher version when online).
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request)
        .then(res => {
          if (res && res.status === 200 && res.type === 'basic') {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return res;
        })
        .catch(() => cached); // offline — fall back to cache
      return cached || networkFetch;
    })
  );
});

// Allows the page to ask the service worker to fire a notification even if the
// page itself is backgrounded/throttled — more reliable than a setTimeout in the tab.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body } = event.data;
    self.registration.showNotification(title, {
      body,
      icon: './icon-192.png',
      badge: './icon-192.png'
    });
  }
});
