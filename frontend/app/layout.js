import './globals.css';
import { CartProvider } from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';

// Lazy load the AI Assistant to prevent it from slowing down the initial page load
const AIAssistant = dynamic(() => import('@/components/AIAssistant'), { 
  ssr: false,
  loading: () => null 
});

export const metadata = {
  title: 'Mawolangalan Bites',
  description: 'Artisan cookies and baked goods in Kenya',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics Tracking Code */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-RTF3Z2LTRM`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RTF3Z2LTRM');
            `,
          }}
        />
      </head>
      <body className="bg-brand-cream text-brand-brown min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <AIAssistant />
          <Toaster position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}