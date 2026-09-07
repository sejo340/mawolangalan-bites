import Link from 'next/link';
import { FaCookieBite, FaShoppingCart, FaHeart } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-cream py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-brown mb-4 md:mb-6">
                Crafting Delicious <br />
                <span className="text-brand-green">Memories</span> One Bite at a Time
              </h1>
              <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base px-4 md:px-0">
                Artisan cookies, custom cakes, and premium baked goods made with love and the finest ingredients in Kenya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/products" className="bg-brand-green text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-green-700 transition text-center">
                  Order Now
                </Link>
                <Link href="/contact" className="bg-brand-brown text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-brand-dark transition text-center">
                  Custom Order
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1499636136210-6f4391b5e86c?w=600&h=600&fit=crop" 
                alt="Delicious Cookies" 
                className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-20">
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-brand-green mb-2">500+</div>
              <div className="text-xs md:text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-brand-green mb-2">50+</div>
              <div className="text-xs md:text-sm text-gray-600">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-brand-green mb-2">100%</div>
              <div className="text-xs md:text-sm text-gray-600">Fresh Daily</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-center text-brand-brown mb-8 md:mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Product cards will load from your products page */}
            <div className="bg-brand-cream rounded-xl p-4 text-center">
              <FaCookieBite className="text-4xl md:text-6xl text-brand-gold mx-auto mb-4" />
              <h3 className="font-bold text-sm md:text-lg mb-2">Classic Cookies</h3>
              <p className="text-xs md:text-sm text-gray-600">Fresh baked daily</p>
            </div>
            <div className="bg-brand-cream rounded-xl p-4 text-center">
              <FaHeart className="text-4xl md:text-6xl text-brand-pink mx-auto mb-4" />
              <h3 className="font-bold text-sm md:text-lg mb-2">Custom Cakes</h3>
              <p className="text-xs md:text-sm text-gray-600">Made to order</p>
            </div>
            <div className="bg-brand-cream rounded-xl p-4 text-center">
              <FaShoppingCart className="text-4xl md:text-6xl text-brand-green mx-auto mb-4" />
              <h3 className="font-bold text-sm md:text-lg mb-2">Bulk Orders</h3>
              <p className="text-xs md:text-sm text-gray-600">For events & parties</p>
            </div>
            <div className="bg-brand-cream rounded-xl p-4 text-center">
              <FaCookieBite className="text-4xl md:text-6xl text-brand-brown mx-auto mb-4" />
              <h3 className="font-bold text-sm md:text-lg mb-2">Pastries</h3>
              <p className="text-xs md:text-sm text-gray-600">Flaky & delicious</p>
            </div>
          </div>
          <div className="text-center mt-8 md:mt-12">
            <Link href="/products" className="inline-block bg-brand-brown text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-brand-dark transition">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}