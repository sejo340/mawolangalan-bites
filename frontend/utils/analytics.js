// Custom analytics helper for tracking user actions

export const trackEvent = (eventName, eventData = {}) => {
  // Send to Google Analytics if it's set up
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData);
  }
  
  // Log to console for testing (Press F12 -> Console to see these)
  console.log(`📊 Tracking Event: ${eventName}`, eventData);
};

export const trackPageView = (path) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', { page_path: path });
  }
};