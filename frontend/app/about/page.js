export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-brown text-center mb-12">
          About Us
        </h1>

        <div className="bg-white p-8 md:p-12 rounded-xl shadow-md">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              <strong className="text-brand-brown">Mawolangalan Bites</strong> is a proudly Kenyan food brand created from a passion for delicious, creative, and memorable treats. We believe every bite should bring a little more joy to your day.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              From cookies, cupcakes, cakes, brownies, and other sweet treats, we focus on great taste, quality ingredients, and exciting flavors made to satisfy every craving.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Whether you're celebrating, sharing with friends, or simply treating yourself, Mawolangalan Bites is here to make your moments sweeter.
            </p>

            <div className="border-t-2 border-brand-gold pt-8 mt-8">
              <h2 className="text-2xl font-heading font-bold text-brand-brown mb-4 text-center">
                Mawolangalan Bites
              </h2>
              <p className="text-xl text-brand-green font-semibold text-center italic">
                Elevate Your Mood the Sweet Way
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-brand-brown text-white p-6 rounded-xl text-center">
            <p className="text-4xl font-bold mb-2">100%</p>
            <p className="text-brand-gold">Quality Ingredients</p>
          </div>
          <div className="bg-brand-green text-white p-6 rounded-xl text-center">
            <p className="text-4xl font-bold mb-2">Fresh</p>
            <p className="text-brand-gold">Baked Daily</p>
          </div>
          <div className="bg-brand-pink text-white p-6 rounded-xl text-center">
            <p className="text-4xl font-bold mb-2">500+</p>
            <p className="text-brand-gold">Happy Customers</p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-brand-gold/20 to-brand-pink/20 p-8 rounded-xl mt-12 text-center">
          <h3 className="text-2xl font-heading font-bold text-brand-brown mb-4">Our Promise</h3>
          <p className="text-gray-700 text-lg">
            We're committed to bringing you the finest baked goods made with love, creativity, and the highest quality ingredients. Every treat is crafted to bring a smile to your face and sweetness to your day.
          </p>
        </div>
      </div>
    </div>
  );
}