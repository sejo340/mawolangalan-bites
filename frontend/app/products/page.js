'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import { FaShoppingCart, FaFilter } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(p => p.category === category);

  const categories = ['all', 'cookies', 'cakes', 'pastries', 'brownies'];

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-green mx-auto mb-4"></div>
          <p className="text-brand-brown text-lg">Loading delicious treats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-center text-brand-brown mb-6 md:mb-8">
          Our Products
        </h1>

        {/* Category Filter - Mobile Optimized */}
        <div className="mb-6 md:mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 md:gap-4 min-w-max justify-start md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold capitalize transition text-sm md:text-base ${
                  category === cat
                    ? 'bg-brand-green text-white'
                    : 'bg-white text-brand-brown hover:bg-brand-cream'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="relative">
                <img
                  src={product.image || 'https://images.unsplash.com/photo-1499636136210-6f4391b5e86c?w=400&h=300&fit=crop'}
                  alt={product.name}
                  className="w-full h-48 md:h-64 object-cover"
                />
                {product.stock < 10 && product.stock > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Only {product.stock} left!
                  </span>
                )}
              </div>
              
              <div className="p-4 md:p-6">
                <h3 className="font-bold text-lg md:text-xl text-brand-brown mb-2">{product.name}</h3>
                <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-brand-green font-bold text-lg md:text-xl">KES {product.price}</span>
                  {product.weight && (
                    <span className="text-gray-500 text-xs md:text-sm">{product.weight}</span>
                  )}
                </div>

                {product.stock > 0 ? (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-brand-green text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 py-2 md:py-3 rounded-lg font-semibold cursor-not-allowed text-sm md:text-base"
                  >
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}