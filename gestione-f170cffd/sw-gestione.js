// Gestionale PavimentiPro: notifiche dei nuovi ordini (servizio v20). Nessuna cache.
self.addEventListener("install", function(e){ self.skipWaiting(); });
self.addEventListener("activate", function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener("push", function(e){
  e.waitUntil(self.registration.showNotification("Nuovo ordine", { body: "È arrivato un nuovo ordine: tocca per aprire il gestionale.", icon: "../icon-192.png", badge: "../icon-192.png", tag: "ordine-" + Date.now(), renotify: true, vibrate: [300, 150, 300] }));
});
self.addEventListener("notificationclick", function(e){
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(l){
    for (var i = 0; i < l.length; i++){ if ("focus" in l[i]) return l[i].focus(); }
    return self.clients.openWindow("./index.html");
  }));
});
