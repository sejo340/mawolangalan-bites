import Link from 'next/link';

export default function HomePage() {
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
              <Link href="/contact" className="bg-brand-brown text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-brand-dark transition shadow-lg text-center">
                Custom Order
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12">
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-brand-brown">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-brand-brown">50+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-brand-brown">100%</div>
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