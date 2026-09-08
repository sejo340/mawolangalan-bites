'use client';
import { useState } from 'react';
import { useCart } from '@/components/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'mpesa'
  });
  const [location, setLocation] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported');
      return;
    }

    toast.loading('Finding location...');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Calculate distance from bakery (example coordinates)
        const bakeryLat = -1.2921;
        const bakeryLng = 36.8219;
        
        const distance = calculateDistance(latitude, longitude, bakeryLat, bakeryLng);
        const fee = Math.ceil(distance) * 50; // KES 50 per km
        
        setLocation({ lat: latitude, lng: longitude });
        setDeliveryFee(fee);
        toast.dismiss();
        toast.success(`Location found! Distance: ${distance.toFixed(2)} km`);
      },
      (error) => {
        toast.dismiss();
        toast.error('Failed to get location');
      }
    );
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const orderData = {
        ...formData,
        items: cartItems,
        total: cartTotal + deliveryFee,
        deliveryFee,
        location
      };

      await axios.post(`${API_URL}/orders`, orderData);
      toast.success('Order placed successfully!');
      clearCart();
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold text-brand-brown mb-4">Your cart is empty</h1>
        <a href="/products" className="bg-brand-green text-white px-8 py-3 rounded-lg font-semibold">
          Browse Products
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream py-8 md:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-brown mb-8 text-center">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="0700 000 000"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Delivery Address *</label>
              <textarea
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Delivery Location</label>
              <button
                type="button"
                onClick={getLocation}
                className="w-full bg-brand-gold text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition flex items-center justify-center gap-2"
              >
                <FaMapMarkerAlt /> Use My Current Location
              </button>
              {deliveryFee > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  Distance: {calculateDistance(location?.lat || 0, location?.lng || 0, -1.2921, 36.8219).toFixed(2)} km | Delivery Fee: KES {deliveryFee}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Payment Method *</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mpesa"
                    checked={formData.paymentMethod === 'mpesa'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  />
                  <span>M-Pesa (STK Push)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-brand-cream rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>KES {cartTotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>KES {deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span className="text-brand-green">KES {cartTotal + deliveryFee}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-green text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition mt-6 disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
}