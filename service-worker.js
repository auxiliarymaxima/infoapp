self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage("Service worker activated and in control!");
    });
  });
});