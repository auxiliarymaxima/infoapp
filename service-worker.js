self.addEventListener('install', event => {
  self.skipWaiting(); // Force it to activate right away
});

self.addEventListener('activate', event => {
  event.waitUntil(
    self.clients.claim() // Start controlling pages immediately
  );
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage("Service worker activated and in control!");
    });
  });
});
