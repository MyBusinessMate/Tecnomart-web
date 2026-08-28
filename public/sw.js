const CACHE_NAME = 'tecnomart-v2';

const PRECACHE_URLS = [
  '/',
  '/mobiles',
  '/laptops',
  '/gaming',
  '/accessories',
  '/refurbished',
  '/repairs',
  '/deals',
  '/exchange',
  '/emi-calculator',
  '/compare',
  '/students',
  '/about',
  '/contact',
  '/logo.png',
];

// Install: cache all main pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS.map((url) => new Request(url, { credentials: 'same-origin' })));
    }).catch((err) => {
      console.warn('[SW] Pre-cache failed for some URLs:', err);
    })
  );
  self.skipWaiting();
});

// Activate: claim clients and remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: network-first strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests from same origin
  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;

  // Skip chrome-extension and non-http requests
  if (!request.url.startsWith('http')) return;

  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        // Clone before consuming
        if (networkResponse && networkResponse.status === 200) {
          const cloned = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, cloned);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Network failed — try cache
        return caches.match(request).then((cached) => {
          if (cached) return cached;
          // Fallback to cached homepage for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
          return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
        });
      })
  );
});
