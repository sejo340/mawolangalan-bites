import Link from 'next/link';
import { FaCookieBite, FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero Section */}
      <section className="bg-brand-cream py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-brown mb-4 md:mb-6 leading-tight">
                Crafting Delicious <br />
                <span className="text-brand-green">Memories</span> One Bite at a Time
              </h1>
              <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg px-4 md:px-0">
                Artisan cookies, custom cakes, and premium baked goods made with love and the finest ingredients in Kenya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/products" className="bg-brand-green text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition text-center shadow-lg">
                  Order Now
                </Link>
                <Link href="/contact" className="bg-brand-brown text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-dark transition text-center shadow-lg">
                  Custom Order
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1499636136210-6f4391b5e86c?w=600&h=600&fit=crop" 
                alt="Delicious Cookies" 
                className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-20 max-w-4xl mx-auto">
            <div className="text-center bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl md:text-4xl font-bold text-brand-green mb-2">500+</div>
              <div className="text-xs md:text-sm text-gray-600 font-semibold">Happy Customers</div>
            </div>
            <div className="text-center bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl md:text-4xl font-bold text-brand-green mb-2">50+</div>
              <div className="text-xs md:text-sm text-gray-600 font-semibold">Products</div>
            </div>
            <div className="text-center bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl md:text-4xl font-bold text-brand-green mb-2">100%</div>
              <div className="text-xs md:text-sm text-gray-600 font-semibold">Fresh Daily</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-brand-brown mb-4">
            Our Specialties
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover our most loved treats, baked fresh every single morning.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-brand-cream rounded-xl p-6 text-center hover:shadow-xl transition duration-300">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <FaCookieBite className="text-3xl text-brand-gold" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-brand-brown">Classic Cookies</h3>
              <p className="text-sm text-gray-600">Fresh baked daily with premium chocolate.</p>
            </div>
            
            <div className="bg-brand-cream rounded-xl p-6 text-center hover:shadow-xl transition duration-300">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <FaHeart className="text-3xl text-brand-pink" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-brand-brown">Custom Cakes</h3>
              <p className="text-sm text-gray-600">Made to order for your special occasions.</p>
            </div>
            
            <div className="bg-brand-cream rounded-xl p-6 text-center hover:shadow-xl transition duration-300">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <FaShoppingCart className="text-3xl text-brand-green" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-brand-brown">Bulk Orders</h3>
              <p className="text-sm text-gray-600">Perfect for events, parties, and offices.</p>
            </div>
            
            <div className="bg-brand-cream rounded-xl p-6 text-center hover:shadow-xl transition duration-300">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <FaStar className="text-3xl text-brand-brown" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-brand-brown">Gourmet Pastries</h3>
              <p className="text-sm text-gray-600">Flaky, buttery, and absolutely delicious.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/products" className="inline-block bg-brand-brown text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-dark transition shadow-lg">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}