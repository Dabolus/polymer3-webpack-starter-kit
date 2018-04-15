// Write your own Service Worker related code here. You don't need to implement
// caching strategies, as Workbox will auto-inject that part when you build your
// project. This is the perfect place to implement other great SW features.
// (e.g. Web Push, etc...)

// This part is needed by the webpack Workbox plugin to inject the precache manifest.
// You can either leave it at the beginning of your SW, or move it where you prefer.
// Just make sure you don't delete it, otherwise
workbox.skipWaiting();
workbox.clientsClaim();
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest);
workbox.routing.registerRoute(/\/scripts\/wc\/.*(?!loader).*\.js$/, workbox.strategies.staleWhileRevalidate(), 'GET');
// Uncomment next line to enable offline Google Analytics
// workbox.googleAnalytics.initialize();
