'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-brand-cream shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-heading font-bold text-brand-brown">
          MAWOLANGALAN <span className="text-brand-green">BITES</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="text-brand-brown hover:text-brand-green font-semibold transition">Home</Link>
          <Link href="/products" className="text-brand-brown hover:text-brand-green font-semibold transition">Products</Link>
          <Link href="/custom-cakes" className="text-brand-brown hover:text-brand-green font-semibold transition">Custom Cakes</Link>
          <Link href="/about" className="text-brand-brown hover:text-brand-green font-semibold transition">About</Link>
          <Link href="/contact" className="text-brand-brown hover:text-brand-green font-semibold transition">Contact</Link>
          
          {/* Simple Cart Button (No logic for now) */}
          <Link href="/cart" className="relative text-brand-brown hover:text-brand-green transition">
            <FaShoppingCart className="text-2xl" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-brand-brown text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col space-y-4 p-4">
            <Link href="/" className="text-brand-brown hover:text-brand-green font-semibold" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/products" className="text-brand-brown hover:text-brand-green font-semibold" onClick={() => setIsOpen(false)}>Products</Link>
            <Link href="/custom-cakes" className="text-brand-brown hover:text-brand-green font-semibold" onClick={() => setIsOpen(false)}>Custom Cakes</Link>
            <Link href="/about" className="text-brand-brown hover:text-brand-green font-semibold" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/contact" className="text-brand-brown hover:text-brand-green font-semibold" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link href="/cart" className="text-brand-brown hover:text-brand-green font-semibold flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <FaShoppingCart /> Cart
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}