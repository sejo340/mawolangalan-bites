'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  // Default fallback stats
  const [stats, setStats] = useState({ customers: 500, products: 50, fresh: "100%" });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_URL}/stats`);
        const data = await res.json();
        
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
        // Keep fallback stats if fetch fails
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Column - Text */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-brown mb-6 leading-tight font-serif">
              Crafting Delicious <br />
              <span className="text-brand-green">Memories</span> One Bite at <br />
              a Time
            </h1>
            
            <p className="text-gray-600 mb-8 text-base md:text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
              Artisan cookies, custom cakes, and premium baked goods made with love and the finest ingredients in Kenya.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
              <Link href="/products" className="bg-brand-green text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-green-700 transition shadow-lg text-center">
                Order Now
              </Link>
              <Link href="/custom-cakes" className="bg-brand-brown text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-brand-dark transition shadow-lg text-center">
                Custom Cakes
              </Link>
            </div>

            {/* ✅ DYNAMIC Stats Section */}
            <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12">
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-brand-brown">{stats.customers}+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-brand-brown">{stats.products}+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-brand-brown">{stats.fresh}</div>
                <div className="text-sm text-gray-600">Fresh Daily</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mt-8 md:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=800&fit=crop" 
              alt="Delicious Chocolate Chip Cookies" 
              className="w-full h-auto object-cover"
            />
          </div>
          
        </div>
      </section>
    </div>
  );
}