'use client';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-brown text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-heading font-bold mb-4">
              MAWOLANGALAN <span className="text-brand-green">BITES</span>
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Crafting delicious memories one bite at a time. Artisan cookies, custom cakes, and premium baked goods made with love in Kitui.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-brand-green transition text-xl"><FaFacebook /></a>
              <a href="#" className="text-gray-300 hover:text-brand-green transition text-xl"><FaInstagram /></a>
              <a href="https://wa.me/254784437428" className="text-gray-300 hover:text-brand-green transition text-xl"><FaWhatsapp /></a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-brand-green">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 grid grid-cols-2 gap-x-4 gap-y-2">
              <li>
                <Link href="/" className="hover:text-brand-green transition hover:pl-1 duration-200 text-sm">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-brand-green transition hover:pl-1 duration-200 text-sm">Products</Link>
              </li>
              <li>
                <Link href="/custom-cakes" className="hover:text-brand-green transition hover:pl-1 duration-200 text-sm">Custom Cakes</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-green transition hover:pl-1 duration-200 text-sm">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-green transition hover:pl-1 duration-200 text-sm">Contact</Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-brand-green transition hover:pl-1 duration-200 text-sm">My Cart</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - ✅ UPDATED TO KITUI */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-brand-green">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-brand-green mt-1 flex-shrink-0" />
                <span className="text-sm">Kitui, Kenya</span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhone className="text-brand-green mt-1 flex-shrink-0" />
                <a href="tel:+254784437428" className="text-sm hover:text-brand-green transition">+254 784 437 428</a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-brand-green mt-1 flex-shrink-0" />
                <a href="mailto:mawolangalanbites@gmail.com" className="text-sm hover:text-brand-green transition break-all">mawolangalanbites@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-brand-green">Opening Hours</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>9:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>Online Only</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Mawolangalan Bites. All rights reserved.</p>
          <Link href="/admin/login" className="text-gray-600 hover:text-brand-green transition text-xs mt-2 inline-block">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}