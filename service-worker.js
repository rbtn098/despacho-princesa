
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('despacho-v7').then(cache =>
      cache.addAll(['./', './index.html', './manifest.json'])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== 'despacho-v7').map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
