import './globals.css';
import { CartProvider } from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Mawolangalan Bites',
  description: 'Artisan cookies and baked goods in Kenya',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-brand-cream text-brand-brown min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}