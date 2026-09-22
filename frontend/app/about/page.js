import { FaHeart, FaAward, FaUsers, FaLeaf } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-cream py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-brown mb-4">
            About Mawolangalan Bites
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Crafting delicious memories one bite at a time
          </p>
        </div>

        {/* Main Story */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold text-brand-brown mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Mawolangalan Bites was born from a passion for creating exceptional baked goods that bring people together. What started as a small home bakery has grown into a beloved artisan bakery serving the heart of Kenya.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We believe in using only the finest ingredients, traditional baking methods, and a whole lot of love to create treats that not only taste amazing but also create lasting memories.
          </p>
        </div>

        {/* Values - Simplified */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <FaHeart className="text-4xl text-brand-green mb-4" />
            <h3 className="text-xl font-bold text-brand-brown mb-2">Made with Love</h3>
            <p className="text-gray-600">Every product is crafted with care and attention to detail.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <FaLeaf className="text-4xl text-brand-green mb-4" />
            <h3 className="text-xl font-bold text-brand-brown mb-2">Fresh Ingredients</h3>
            <p className="text-gray-600">We source only the finest, freshest ingredients for our recipes.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <FaAward className="text-4xl text-brand-green mb-4" />
            <h3 className="text-xl font-bold text-brand-brown mb-2">Quality First</h3>
            <p className="text-gray-600">Premium quality in every bite, every time.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <FaUsers className="text-4xl text-brand-green mb-4" />
            <h3 className="text-xl font-bold text-brand-brown mb-2">Community Focused</h3>
            <p className="text-gray-600">Proudly serving our local community with pride.</p>
          </div>
        </div>

        {/* Stats - Simple */}
        <div className="bg-brand-brown text-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-brand-cream">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-brand-cream">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-brand-cream">Fresh Daily</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}