'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="bg-brand-brown text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-heading font-bold">
            <span className="text-brand-gold">MAWOLANGALAN</span> BITES
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-brand-gold transition">Home</Link>
            <Link href="/products" className="hover:text-brand-gold transition">Products</Link>
            <Link href="/about" className="hover:text-brand-gold transition">About</Link>
            <Link href="/contact" className="hover:text-brand-gold transition">Contact</Link>
            <Link 
              href="/cart" 
              className="relative bg-brand-green px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center"
            >
              <FaShoppingCart className="mr-2" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-brand-gold transition">Home</Link>
              <Link href="/products" className="hover:text-brand-gold transition">Products</Link>
              <Link href="/about" className="hover:text-brand-gold transition">About</Link>
              <Link href="/contact" className="hover:text-brand-gold transition">Contact</Link>
              <Link 
                href="/cart" 
                className="bg-brand-green px-4 py-2 rounded-lg hover:bg-green-700 transition inline-block text-center"
              >
                Cart ({cartCount})
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}