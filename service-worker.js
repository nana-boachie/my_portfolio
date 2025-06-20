/**
 * Service Worker for Portfolio Website
 * Provides offline capability and performance optimization
 */

// Cache version - increment when making significant changes
const CACHE_VERSION = 'v1';
const CACHE_NAME = `portfolio-cache-${CACHE_VERSION}`;

// Assets to cache on install
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/optimized-styles.css',
  '/optimized-scripts.js',
  '/pages/sections/about.html',
  '/pages/sections/projects.html',
  '/pages/sections/skills.html',
  '/pages/sections/certifications.html',
  '/pages/sections/contact.html',
  '/pages/blog.html',
  '/img/profile.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdn.tailwindcss.com'
];

// Install event - cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(CACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin) || 
      event.request.url.includes('cdnjs.cloudflare.com') ||
      event.request.url.includes('cdn.tailwindcss.com')) {
    
    event.respondWith(
      // Try network first, then fall back to cache
      fetch(event.request)
        .then(response => {
          // Clone the response to store in cache
          const responseClone = response.clone();
          
          // Open cache and store response
          caches.open(CACHE_NAME)
            .then(cache => {
              // Only cache successful responses
              if (response.status === 200) {
                cache.put(event.request, responseClone);
              }
            });
            
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // For HTML pages, return the offline page 
              if (event.request.headers.get('accept').includes('text/html')) {
                return caches.match('/');
              }
            });
        })
    );
  }
});

// Handle messages from the main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
