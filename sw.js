const CACHE_NAME = 'qexeron-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/6417DFC5-D79B-49EE-BC6C-A89E6BCAD2CE.png',
  'https://s3.tradingview.com/tv.js'
];

// O'rnatish
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Ishlatish (Offline rejim uchun ham)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
