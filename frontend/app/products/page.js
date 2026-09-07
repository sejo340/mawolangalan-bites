'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'all'
        ? `${process.env.NEXT_PUBLIC_API_URL}/products`
        : `${process.env.NEXT_PUBLIC_API_URL}/products?category=${selectedCategory}`;
      
      const res = await axios.get(url);
      setProducts(res.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'cookies', label: 'Cookies' },
    { value: 'cakes', label: 'Cakes' },
    { value: 'pastries', label: 'Pastries' },
    { value: 'brownies', label: 'Brownies' },
    { value: 'bread', label: 'Bread' }
  ];

  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-brown text-center mb-8">
          Our Products
        </h1>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === cat.value
                  ? 'bg-brand-green text-white'
                  : 'bg-white text-brand-brown hover:bg-brand-gold/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-xl">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}