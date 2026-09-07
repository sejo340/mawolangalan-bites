'use client';

import { useCart } from './CartContext';
import toast from 'react-hot-toast';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group border border-gray-100">
      <div className="relative overflow-hidden h-64">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1499636136210-6f4391b5e86c?w=400&h=300&fit=crop'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
        {product.dietaryInfo?.vegan && (
          <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Vegan
          </span>
        )}
        {product.dietaryInfo?.glutenFree && (
          <span className="absolute top-2 right-2 bg-brand-gold text-white px-2 py-1 rounded text-xs font-semibold">
            Gluten Free
          </span>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-brown mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-brand-green">KES {product.price}</span>
          <button
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className="bg-brand-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaShoppingCart className="mr-2" />
            Add
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">Weight: {product.weight}</p>
      </div>
    </div>
  );
}