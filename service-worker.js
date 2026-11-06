// SmartFin PRO: cache atualizado após o reparo de autenticação.
const CACHE='smartfin-access-normal-v4';
const STATIC=['/','/index.html','/css/themes.css','/js/features.js','/icons/icon.svg','/manifest.webmanifest'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
  if(req.mode==='navigate'){
    e.respondWith(fetch(req,{cache:'no-store'}).catch(()=>caches.match('/index.html')));
    return;
  }
  e.respondWith(fetch(req).then(response=>{
    if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(req,copy));}
    return response;
  }).catch(()=>caches.match(req)));
});
