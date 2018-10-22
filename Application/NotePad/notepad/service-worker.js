const CACHE = '38c5c3042d0b50266d9b1ce4b61c22588e9068848b36712c6ea3afa631eee229';
const RUNTIME = 'runtime';
const PRECACHE_URLS = ['/icon-76x76.png',
'/icon-192x192.png',
'/icon-32x32.png',
'/icon-120x120.png',
'/icon-256x256.png',
'/codemirror/codemirror.js',
'/codemirror/codemirror.css',
'/codemirror/javascript.js',
'/codemirror/markdown.js',
'/trayicon-16.png',
'/index.html',
'/clipboard.png',
'/icon-57x57.png',
'/icon-180x180.png',
'/editorThemes/icecoder.css',
'/editorThemes/xq-light.css',
'/editorThemes/the-matrix.css',
'/editorThemes/neo.css',
'/editorThemes/lesser-dark.css',
'/editorThemes/3024-day.css',
'/editorThemes/hopscotch.css',
'/editorThemes/liquibyte.css',
'/editorThemes/midnight.css',
'/editorThemes/duotone-light.css',
'/editorThemes/elegant.css',
'/editorThemes/mbo.css',
'/editorThemes/material.css',
'/editorThemes/ttcn.css',
'/editorThemes/mdn-like.css',
'/editorThemes/xq-dark.css',
'/editorThemes/base16-light.css',
'/editorThemes/gruvbox-dark.css',
'/editorThemes/isotope.css',
'/editorThemes/ambiance.css',
'/editorThemes/darcula.css',
'/editorThemes/paraiso-dark.css',
'/editorThemes/lucario.css',
'/editorThemes/erlang-dark.css',
'/editorThemes/colorforth.css',
'/editorThemes/twilight.css',
'/editorThemes/3024-night.css',
'/editorThemes/vibrant-ink.css',
'/editorThemes/monokai.css',
'/editorThemes/idea.css',
'/editorThemes/dracula.css',
'/editorThemes/base16-dark.css',
'/editorThemes/zenburn.css',
'/editorThemes/shadowfox.css',
'/editorThemes/neat.css',
'/editorThemes/blackboard.css',
'/editorThemes/tomorrow-night-eighties.css',
'/editorThemes/night.css',
'/editorThemes/paraiso-light.css',
'/editorThemes/eclipse.css',
'/editorThemes/railscasts.css',
'/editorThemes/tomorrow-night-bright.css',
'/editorThemes/solarized.css',
'/editorThemes/seti.css',
'/editorThemes/panda-syntax.css',
'/editorThemes/abcdef.css',
'/editorThemes/duotone-dark.css',
'/editorThemes/cobalt.css',
'/editorThemes/rubyblue.css',
'/editorThemes/pastel-on-dark.css',
'/editorThemes/ambiance-mobile.css',
'/editorThemes/bespin.css',
'/editorThemes/yeti.css',
'/editorThemes/oceanic-next.css',
'/editorThemes/ssms.css',
'/trayicon-16.icns',
'/icon-72x72.png',
'/icon-36x36.png',
'/icon-96x96.png',
'/icon-152x152.png',
'/index.js',
'/trayicon-256.png',
'/icon-48x48.png',
'/trayicon-256.icns',
'/manifest.json',
'/icon-512x512.png',
'/icon-144x144.png',
'/icon-167x167.png',
'/icon-196x196.png',
'/icon-128x128.png',
'/icon-16x16.png'];

// On install precache all static resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then(cache =>  {
        const promises =
          PRECACHE_URLS.map((url) =>
            cache
              .add(url)
              .catch(error => console.log(`Could not cache: ${url}!`))
          )

        return Promise.all(promises)
      })
      .then(self.skipWaiting())
  );
});

// On activate remove all unused caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => cacheName !== CACHE);
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = event.request.url
  const origin = self.location.origin
  const isSameOrigin = url.startsWith(origin)
  let response = null

  // If we are on the same origin
  if (isSameOrigin) {
    // resolve the path
    const path = url.slice(origin.length)

    // Try to get the response from the cache if not available fall back to
    // the "index.html" file.
    response =
      caches
        .match(event.request)
        .then(cachedResponse => cachedResponse || caches.match("/index.html"))
  } else {
    response = fetch(event.request)
  }

  event.respondWith(response)
});