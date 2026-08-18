const CACHE='kaizen-v20260818140053';
const STATIC=['./manifest.json','./icon-192.png','./icon-512.png'];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){return c.addAll(STATIC);})
    .then(function(){return self.skipWaiting();})
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){return caches.delete(k);}));
    }).then(function(){return self.clients.claim();})
    .then(function(){
      // Force all open tabs to reload
      return self.clients.matchAll({type:'window'}).then(function(clients){
        clients.forEach(function(client){client.navigate(client.url);});
      });
    })
  );
});

self.addEventListener('message', function(e){
  if(e.data && e.data.type==='SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', function(e){
  var url = new URL(e.request.url);
  if(url.hostname.indexOf('supabase.co') >= 0){ return; }
  // Always go to network for HTML — never serve stale
  if(e.request.destination === 'document' || url.pathname.endsWith('.html') || url.pathname === '/'){
    e.respondWith(
      fetch(e.request, {cache: 'no-store'}).then(function(res){
        if(res && res.status === 200){
          var clone = res.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, clone); });
        }
        return res;
      }).catch(function(){ return caches.match('./index.html'); })
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(cached){
      if(cached) return cached;
      return fetch(e.request).then(function(res){
        if(res && res.status === 200 && res.type !== 'opaque'){
          var clone = res.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, clone); });
        }
        return res;
      }).catch(function(){ return caches.match('./index.html'); });
    })
  );
});