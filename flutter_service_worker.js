'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "cc426094ed46febd0af8943f89cb1c15",
"index.html": "0a5862a972ae9adccfae6acd06bfdc3e",
"/": "0a5862a972ae9adccfae6acd06bfdc3e",
"main.dart.js": "2940fb007890c70a2f1b7881a3350e23",
"flutter.js": "0816e65a103ba8ba51b174eeeeb2cb67",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "0ef19d31a7cbe7ed02f7012f8a5724b7",
"assets/AssetManifest.json": "f73d2075137fc714b15ab1eaaf99ab6f",
"assets/NOTICES": "a641bf5db42a402eae2058bc83d30ca9",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/images/logo%25205.png": "254f5199cab4184348abccd695ba81fe",
"assets/assets/images/logo%25204.png": "5cb229d639e6e265387fec3f707ae47e",
"assets/assets/images/logo%25206.png": "dc029d8ae3c93166f4d3b738a0fd59aa",
"assets/assets/images/logo%25207.png": "915e8b2004c8a8e9b31acc6a472e6b95",
"assets/assets/images/logo%25203.png": "8c70b32d86bbc8cd5d7bd3dfd5432eae",
"assets/assets/images/Logo%25202.png": "278c381beb0bea7a024ef3f631651539",
"assets/assets/images/website.png": "151e0de9d568420461b4e9fbf140b186",
"assets/assets/images/logo%25201.png": "b260d6507aab3b3cf4303fcbe7d0199e",
"assets/assets/images/karen.png": "2f827b47b050cc906632380b77313979",
"assets/assets/images/pacificfunds.png": "4192ca5a97c94ec17293dfc5c9565b02",
"assets/assets/images/rectangle.png": "da9777e2da2d5a05589fb1db7fc92d35",
"assets/assets/images/lattice.png": "6138b43b6fa2593f6e9c4ea9a4fd3333",
"assets/assets/images/performance_graph.png": "07395dcb0a2b366ef7560e2e7a4b50f4",
"assets/assets/images/company.png": "9a5542ab6aaa7ae4268dbed18a5c2f8e",
"assets/assets/images/logo.png": "d7bc2791e9699f117025c2b75ca4ae24",
"assets/assets/images/profile.png": "f9d9b29bc94e8bc8d2ac6f3a2e32731b",
"assets/assets/images/web.png": "73761675cc86a4058f112daec75e4f00",
"assets/assets/images/4.png": "ab713c6b586a01ab5fc1dd38ad0d0544",
"assets/assets/images/mentioned_logo.png": "b5d0d7130bbb9b6837f299e0063f3f9e",
"assets/assets/images/2.png": "74adcaa11b42854e716864d865db29a1",
"assets/assets/images/3.png": "ab713c6b586a01ab5fc1dd38ad0d0544",
"assets/assets/images/1.png": "c30647137243af132435f1c49efd0566",
"assets/assets/images/managebusiness.png": "0f371045f73d600d130db0c4fc57ed7f",
"assets/assets/icons/arrow.svg": "33f6d91fe42b25eeb8f9ae7285d8d868",
"assets/assets/icons/instagram.svg": "710db83103fe7c1f65f45ed0c42c629b",
"assets/assets/icons/upward_arrow.svg": "02291a01c6634adec61621d3157400ef",
"assets/assets/icons/check.svg": "749a052ffda347311ed75edccf7d51f3",
"assets/assets/icons/facebook.svg": "ab4f005dc73a1362fe382c2a07cf2f05",
"assets/assets/icons/twitter.svg": "bf02cc64d7cf4fa1e999e322cd6da707",
"assets/assets/icons/arrowUp.svg": "f8375b69b734520723eba5b508379b01",
"assets/assets/icons/logo.svg": "3a308aef0dbab741e0c73040d3158932",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}