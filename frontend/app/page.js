import HeroSection from '@/components/HeroSection';
import ServicesGrid from '@/components/ServicesGrid';
import Testimonials from '@/components/Testimonials';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default async function Home() {
  let featuredProducts = [];
  try {
    const res = await fetch('http://localhost:5000/api/products?limit=4', {
      cache: 'no-store'
    });
    const data = await res.json();
    featuredProducts = data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <>
      <HeroSection />
      <ServicesGrid />
      
      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-brown mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600">Handpicked favorites from our bakery</p>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-brand-cream rounded-xl">
              <p className="text-gray-600 mb-4">No products yet. Add some products using Thunder Client!</p>
              <Link href="/products" className="text-brand-green font-semibold hover:underline">
                View All Products →
              </Link>
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/products" className="inline-block bg-brand-brown text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-brown/90 transition">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-brand-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Order?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get fresh, delicious baked goods delivered to your doorstep. Order now and taste the difference!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-brand-green px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="bg-brand-brown text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-brand-brown/90 transition"
            >
              Custom Order
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}