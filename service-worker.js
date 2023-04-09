const cacheVersion = '1-' + process.env.CACHE_VERSION_HASH;
const currentCache = {
  offline: 'offline-cache-' + cacheVersion
};
const offlineUrl = 'offline-page.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function (cache) {
      return cache.addAll([
        "style.css",
        offlineUrl
      ]);
    })
  );
});

this.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== currentCache.offline) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

this.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        return caches.match(offlineUrl);
      })
    );
  }
  else {
    event.respondWith(caches.match(event.request)
      .then(function (response) {
        return response || fetch(event.request);
      })
    );
  }
});
