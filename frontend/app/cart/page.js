'use client';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <FaShoppingBag className="text-6xl text-gray-300 mb-4" />
        <h1 className="text-3xl font-bold text-brand-brown mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added any treats yet.</p>
        <Link href="/products" className="bg-brand-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-brown mb-8 text-center">
          Your Cart
        </h1>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-100">
            {cartItems.map((item) => (
              <div key={item._id} className="p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="w-full md:w-24 h-48 md:h-24 flex-shrink-0">
                  <img 
                    src={item.image || 'https://images.unsplash.com/photo-1499636136210-6f4391b5e86c?w=200&h=200&fit=crop'} 
                    alt={item.name} 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex-grow text-center md:text-left w-full">
                  <h3 className="font-bold text-lg text-brand-brown">{item.name}</h3>
                  <p className="text-brand-green font-semibold mt-1">KES {item.price}</p>
                </div>

                <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded shadow hover:bg-gray-50 transition"
                  >
                    <FaMinus className="text-xs text-brand-brown" />
                  </button>
                  <span className="font-bold text-brand-brown w-6 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded shadow hover:bg-gray-50 transition"
                  >
                    <FaPlus className="text-xs text-brand-brown" />
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 transition p-2"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-brand-cream p-6 md:p-8 border-t border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-brand-brown">Subtotal</span>
              <span className="text-2xl font-bold text-brand-green">KES {cartTotal.toLocaleString()}</span>
            </div>
            
            <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
              Shipping and delivery fees calculated at checkout.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <Link href="/products" className="flex-1 text-center border-2 border-brand-brown text-brand-brown py-3 rounded-lg font-semibold hover:bg-brand-brown hover:text-white transition">
                Continue Shopping
              </Link>
              <Link href="/checkout" className="flex-1 text-center bg-brand-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg">
                Proceed to Checkout
              </Link>
            </div>
            
            <button 
              onClick={clearCart}
              className="w-full mt-4 text-sm text-red-500 hover:text-red-700 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}