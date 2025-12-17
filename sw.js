// Service Worker for Zambia Betting Rankings
const CACHE_NAME = 'zambia-betting-rankings-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/comparison.html',
  '/about.html',
  '/guides/',
  '/guides/index.html',
  '/guides/how-to-choose-betting-site.html',
  '/guides/payment-methods-zambia.html',
  '/guides/betting-for-beginners.html',
  '/reviews/bwanabet.html',
  '/reviews/bolabet.html',
  '/reviews/gal-sports-bet.html',
  '/reviews/1xbet.html',
  '/reviews/melbet.html',
  '/reviews/castlebet-lite.html',
  '/reviews/betpawa.html',
  '/reviews/betway.html',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

