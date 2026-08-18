const CACHE='kaizen-v20260818194410';
const STATIC=['./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(STATIC);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.map(function(k){return caches.delete(k);}))}).then(function(){return self.clients.claim();}));});
self.addEventListener('message',function(e){if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',function(e){
  var url=new URL(e.request.url);
  if(url.hostname.indexOf('supabase.co')>=0){return;}
  if(e.request.destination==='document'||url.pathname.endsWith('.html')||url.pathname==='/'){    e.respondWith(fetch(e.request,{cache:'no-store'}).then(function(r){if(r&&r.status===200){var c=r.clone();caches.open(CACHE).then(function(ca){ca.put(e.request,c);});}return r;}).catch(function(){return caches.match('./index.html');}));
    return;
  }
  e.respondWith(caches.match(e.request).then(function(cached){if(cached)return cached;return fetch(e.request).then(function(r){if(r&&r.status===200&&r.type!=='opaque'){var c=r.clone();caches.open(CACHE).then(function(ca){ca.put(e.request,c);});}return r;}).catch(function(){return caches.match('./index.html');});})  );
});