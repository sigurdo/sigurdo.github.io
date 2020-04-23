importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// workbox.precaching.precacheAndRoute(['basketsimulator.html']);
workbox.routing.registerRoute(new RegExp('./'), new workbox.strategies.NetworkFirst());
