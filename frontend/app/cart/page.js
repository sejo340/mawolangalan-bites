'use client';

import { useCart } from '@/components/CartContext';
import Link from 'next/link';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-brand-cream py-20 text-center">
        <div className="container mx-auto px-4">
          <FaShoppingCart className="text-6xl text-brand-brown mx-auto mb-6" />
          <h1 className="text-4xl font-heading font-bold text-brand-brown mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any delicious treats yet!</p>
          <Link href="/products" className="bg-brand-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-heading font-bold text-brand-brown mb-8 text-center">
          Your Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1499636136210-6f4391b5e86c?w=100&h=100&fit=crop'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-brand-brown text-lg">{item.name}</h3>
                  <p className="text-gray-600 text-sm">KES {item.price} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  <span className="font-bold text-brand-brown w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-green text-lg">KES {item.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 transition mt-1"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-md h-fit sticky top-24">
            <h2 className="text-xl font-bold text-brand-brown mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">KES {cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className="text-gray-600">Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-brand-green">KES {cartTotal}</span>
              </div>
            </div>
            <button
              onClick={() => router.push('/checkout')}
              className="w-full bg-brand-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mb-3"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}