/**
 * Service Worker Registration
 * Register the service worker for offline capability and performance improvements
 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        
        // Check for updates on page load
        registration.update();
        
        // Handle updates - notify user when new content is available
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, let's notify the user
              if (confirm('New content is available. Would you like to refresh to see the latest version?')) {
                window.location.reload();
              }
            }
          });
        });
      })
      .catch(error => {
        console.error('ServiceWorker registration failed: ', error);
      });
  });
  
  // Listen for controller change to reload the page after a new service worker activates
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('New service worker activated, reloading for fresh content...');
  });
}
