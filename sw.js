const CACHE_NAME = 'raja-jewellers-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './media/logo.svg',
  './media/favicon.svg',
  './media/bis-hallmark.svg',
  './media/certified-seal.svg',
  './media/hero-bg.jpg',
  './media/bridal-trousseau.jpg',
  './media/bridal-model.jpg',
  './media/gold-necklace.jpg',
  './media/diamond-ring.jpg',
  './media/gold-bangles.jpg',
  './media/earrings-jhumka.jpg',
  './media/gemstones-rubies.jpg',
  './media/silver-pooja.jpg',
  './media/mens-gold.jpg',
  './media/antique-choker.jpg',
  './media/temple-jewelry.jpg',
  './media/polki-necklace.jpg',
  './media/gold-coins.jpg',
  './media/showroom-interior.jpg',
  './media/craftsman-karigar.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request).catch(() => cached))
  );
});
