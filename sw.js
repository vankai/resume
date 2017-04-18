console.log(registration);

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {

  event.waitUntil(self.clients.claim());
  setInterval(function () {
    clients.matchAll({frameType:"window"}).then(list=>{
      console.log(list);
      for(var i =0;i<list.length;i++){
        let client = list[i];
        client.postMessage("in clients matchAll")
      }
    })
    clients.matchAll({frameType:"sharedWorker"}).then(list=>{
      console.log(list);
    })
    registration
      .active
      .postMessage("hellow!")
  }, 1000);

});
