'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '@/components/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="bg-brand-cream shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-heading font-bold text-brand-brown">
            MAWOLANGALAN <span className="text-brand-green">BITES</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-brand-brown hover:text-brand-green transition font-medium">
              Home
            </Link>
            <Link href="/products" className="text-brand-brown hover:text-brand-green transition font-medium">
              Products
            </Link>
            <Link href="/custom-cakes" className="text-brand-brown hover:text-brand-green transition font-medium">
              Custom Cakes
            </Link>
            <Link href="/about" className="text-brand-brown hover:text-brand-green transition font-medium">
              About
            </Link>
            <Link href="/contact" className="text-brand-brown hover:text-brand-green transition font-medium">
              Contact
            </Link>
            <Link href="/cart" className="relative text-brand-brown hover:text-brand-green transition">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-brand-brown"
          >
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="/" className="block text-brand-brown hover:text-brand-green transition py-2">
              Home
            </Link>
            <Link href="/products" className="block text-brand-brown hover:text-brand-green transition py-2">
              Products
            </Link>
            <Link href="/custom-cakes" className="block text-brand-brown hover:text-brand-green transition py-2">
              Custom Cakes
            </Link>
            <Link href="/about" className="block text-brand-brown hover:text-brand-green transition py-2">
              About
            </Link>
            <Link href="/contact" className="block text-brand-brown hover:text-brand-green transition py-2">
              Contact
            </Link>
            <Link href="/cart" className="block text-brand-brown hover:text-brand-green transition py-2">
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}