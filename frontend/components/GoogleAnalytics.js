'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Initialize Google Analytics
  useEffect(() => {
    // Replace with your actual Measurement ID
    const MEASUREMENT_ID = 'G-XXXXXXXXXX'; // <-- PASTE YOUR ID HERE
    ReactGA.initialize(MEASUREMENT_ID);
  }, []);

  // Track page views
  useEffect(() => {
    if (pathname) {
      ReactGA.send({ hitType: "pageview", page: pathname + (searchParams?.toString() || '') });
    }
  }, [pathname, searchParams]);

  return null;
}