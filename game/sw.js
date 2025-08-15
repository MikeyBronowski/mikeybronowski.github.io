const CACHE = 'flagquest-v1';
const ASSETS = [
  '/', '/index.html', '/flags.html', '/spelling.html',
  '/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e=> e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e=>{
  e.respondWith((async ()=>{
    const cache = await caches.open(CACHE);
    const cached = await cache.match(e.request);
    if (cached) return cached;
    try {
      const res = await fetch(e.request, {cache:'no-store'});
      if (res && res.ok) cache.put(e.request, res.clone());
      return res;
    } catch {
      return cached || Response.error();
    }
  })());
});
