const CACHE_NAME = 'qexeron-v7-ultra'; // 🔥 Versiyani yangiladik!
const ASSETS = [
  '/',
  '/index.html',
  '/6417DFC5-D79B-49EE-BC6C-A89E6BCAD2CE.png',
  'https://s3.tradingview.com/tv.js'
];

// 1. O'rnatish (Install)
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Kutib o'tirmasdan darrov o'rnatish
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 2. Aktivlashtirish va Eski keshni tozalash (MUHIM QISMI 🛠)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          // Agar kesh nomi yangi versiyaga to'g'ri kelmasa, uni o'chiramiz
          if (key !== CACHE_NAME) {
            console.log('Eski kesh tozalandi:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Barcha ochiq sahifalarni yangi versiyaga o'tkazish
});

// 3. Ishlatish (Fetch)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
