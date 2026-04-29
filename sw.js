// KAIZEN Service Worker v20260318174704
const CACHE = 'kaizen-v20260429133259';

const STATIC = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(STATIC))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => {
          console.log('[SW] Deleting old cache:', k);
          return caches.delete(k);
        })
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (e.data?.type === 'SET_BUILD') {
    const newCache = 'kaizen-v' + e.data.build;
    if (newCache !== CACHE) {
      caches.keys().then(keys =>
        Promise.all(keys.filter(k => k !== newCache).map(k => caches.delete(k)))
      );
    }
  }
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Never cache Supabase API calls
  if (url.hostname.includes('supabase.co')) {
    e.respondWith(fetch(e.request).catch(() => new Response('', {status: 503})));
    return;
  }
  const isHTML = e.request.destination === 'document'
    || url.pathname.endsWith('.html')
    || url.pathname === '/';
  if (isHTML) {
    // Always network-first for HTML so login screen always loads fresh
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res && res.status === 200) {
            caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          }
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res && res.status === 200 && res.type !== 'opaque') {
            caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          }
          return res;
        }).catch(() => caches.match('./index.html'));
      })
    );
  }
});
