import Link from 'next/link';
import { FaFacebook, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';

export default function Footer() {
  // Your live website URL for the QR code
  const websiteUrl = "https://mawolangalan-bites.vercel.app";

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">
              <span className="text-brand-gold">MAWOLANGALAN</span> BITES
            </h3>
            <p className="text-gray-400 mb-4">
              Crafting delicious memories one bite at a time. Premium baked goods made with love in Kenya.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/mawolangalanbites" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition text-xl">
                <FaFacebook />
              </a>
              <a href="https://instagram.com/mawolangalan_bites" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition text-xl">
                <FaInstagram />
              </a>
              <a href="https://wa.me/254784437428" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition text-xl">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-brand-gold transition">Home</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-brand-gold transition">Products</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-brand-gold transition">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-brand-gold transition">Contact</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-bold mb-4">Our Products</h4>
            <ul className="space-y-2">
              <li><Link href="/products?category=cookies" className="text-gray-400 hover:text-brand-gold transition">Cookies</Link></li>
              <li><Link href="/products?category=cakes" className="text-gray-400 hover:text-brand-gold transition">Custom Cakes</Link></li>
              <li><Link href="/products?category=pastries" className="text-gray-400 hover:text-brand-gold transition">Pastries</Link></li>
              <li><Link href="/products?category=brownies" className="text-gray-400 hover:text-brand-gold transition">Brownies</Link></li>
            </ul>
          </div>

          {/* Contact Info & QR Code */}
          <div className="flex flex-col items-start md:items-end">
            <h4 className="text-lg font-bold mb-4">Scan to Order</h4>
            <div className="bg-white p-3 rounded-xl mb-4">
              {/* The QR Code - Points to your live Vercel website */}
              <QRCodeSVG 
                value={websiteUrl} 
                size={100} 
                bgColor="#ffffff" 
                fgColor="#3E2723" 
                level="H" 
              />
            </div>
            <p className="text-gray-400 text-sm text-center md:text-right mb-4">
              Scan to visit our shop!
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <FaPhone className="text-brand-gold mr-3" />
                <span className="text-gray-400">+254 784 437 428</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-brand-gold mr-3" />
                <span className="text-gray-400">mawolangalanbites@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Mawolangalan Bites. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}