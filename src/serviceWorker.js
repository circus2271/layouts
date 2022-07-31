// sw.js
// how to configure webpack
// https://developer.chrome.com/docs/workbox/using-workbox-without-precaching/
// how to handle caching
// https://developer.chrome.com/docs/workbox/caching-resources-during-runtime/#using-multiple-caches
// remove old cache
// https://developer.chrome.com/docs/workbox/modules/workbox-expiration/#restrict-the-age-of-cached-entries
import { registerRoute, Route, setDefaultHandler } from 'workbox-routing';
import { CacheFirst, NetworkOnly } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// offline fallback
// https://developer.chrome.com/docs/workbox/managing-fallback-responses/#offline-page-only
import { offlineFallback } from 'workbox-recipes';

// setDefaultHandler(new NetworkOnly());

// Handle images:
const imageRoute = new Route(({ request }) => {
  return request.destination === 'image'
}, new CacheFirst({
  cacheName: 'images',
  plugins: [
    new ExpirationPlugin({
      maxAgeSeconds: 24 * 60 * 60 * 24,
    }),
  ],
}));

// Handle scripts:
const scriptsRoute = new Route(({ request, url }) => {
  return request.destination === 'script' && !url.pathname.endsWith('serviceWorker.js');
}, new CacheFirst({
  cacheName: 'scripts',
  plugins: [
    new ExpirationPlugin({
      maxAgeSeconds: 24 * 60 * 60 * 24,
    }),
  ],
}));

// Handle styles:
const stylesRoute = new Route(({ request }) => {
  return request.destination === 'style';
}, new CacheFirst({
  cacheName: 'styles',
  plugins: [
    new ExpirationPlugin({
      maxAgeSeconds: 24 * 60 * 60 * 24,
    }),
  ],
}));

// Register routes
registerRoute(imageRoute);
registerRoute(scriptsRoute);
registerRoute(stylesRoute);

//set offline fallback
offlineFallback()