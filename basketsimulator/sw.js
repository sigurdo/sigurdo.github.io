importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.routing.registerRoute(new RegExp('/sigurdo.github.io/basketsimulator/*'), new workbox.strategies.NetworkFirst());
workbox.routing.registerRoute(new RegExp('/basketsimulator/*'), new workbox.strategies.NetworkFirst());
workbox.routing.registerRoute(new RegExp('https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'), new workbox.strategies.NetworkFirst());
workbox.routing.registerRoute(new RegExp('https://fonts.googleapis.com/css?family=Share Tech Mono'), new workbox.strategies.NetworkFirst());
workbox.routing.registerRoute(new RegExp('https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js'), new workbox.strategies.NetworkFirst());
workbox.routing.registerRoute(new RegExp('https://code.jquery.com/jquery-3.5.0.min.js'), new workbox.strategies.NetworkFirst());
workbox.routing.registerRoute(new RegExp('https://kit.fontawesome.com/abcb570a78.js'), new workbox.strategies.NetworkFirst());
workbox.routing.registerRoute(new RegExp('https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js'), new workbox.strategies.NetworkFirst());
workbox.routing.registerRoute(new RegExp('https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js'), new workbox.strategies.NetworkFirst());
workbox.routing.registerRoute(new RegExp('https://kit-free.fontawesome.com/*'), new workbox.strategies.NetworkFirst());
