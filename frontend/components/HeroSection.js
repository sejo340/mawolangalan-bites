'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-brand-cream via-white to-brand-gold/20 py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-brown leading-tight">
              Crafting Delicious <span className="text-brand-green">Memories</span> One Bite at a Time
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              Artisan cookies, custom cakes, and premium baked goods made with love and the finest ingredients in Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-brand-green text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition text-center"
              >
                Order Now
              </Link>
              <Link
                href="/contact"
                className="bg-brand-brown text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-brand-brown/90 transition text-center"
              >
                Custom Order
              </Link>
            </div>
            <div className="flex items-center space-x-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-brand-brown">500+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-3xl font-bold text-brand-brown">50+</p>
                <p className="text-sm text-gray-600">Products</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-3xl font-bold text-brand-brown">100%</p>
                <p className="text-sm text-gray-600">Fresh Daily</p>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-brand-green/10 rounded-full blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop"
              alt="Delicious cookies"
              className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}