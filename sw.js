const CACHE='kaizen-v20260814113205';
const STATIC=['./manifest.json','./icon-192.png','./icon-512.png'];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){return c.addAll(STATIC);}).then(function(){return self.skipWaiting();})
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
    }).then(function(){return self.clients.claim();})
  );
});

self.addEventListener('message', function(e){
  if(e.data && e.data.type==='SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', function(e){
  var url = new URL(e.request.url);
  // Never intercept Supabase — pass through directly
  if(url.hostname.indexOf('supabase.co') >= 0){ return; }

  var isHTML = e.request.destination==='document' || url.pathname.endsWith('.html') || url.pathname==='/';
  if(isHTML){
    e.respondWith(
      fetch(e.request).then(function(res){
        if(res && res.status===200){
          var clone = res.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, clone); });
        }
        return res;
      }).catch(function(){ return caches.match('./index.html'); })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(cached){
        if(cached) return cached;
        return fetch(e.request).then(function(res){
          if(res && res.status===200 && res.type!=='opaque'){
            var clone = res.clone();
            caches.open(CACHE).then(function(c){ c.put(e.request, clone); });
          }
          return res;
        }).catch(function(){ return caches.match('./index.html'); });
      })
    );
  }
});
