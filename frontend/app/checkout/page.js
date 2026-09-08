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
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    toast.loading('Finding your location...');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Calculate distance from bakery (Nairobi coordinates as example)
        const bakeryLat = -1.2921;
        const bakeryLng = 36.8219;
        
        const distance = calculateDistance(latitude, longitude, bakeryLat, bakeryLng);
        const fee = Math.max(100, Math.ceil(distance) * 50); // Min KES 100, or KES 50 per km
        
        setLocation({ lat: latitude, lng: longitude, distance: distance.toFixed(2) });
        setDeliveryFee(fee);
        toast.dismiss();
        toast.success(`Location found! Distance: ${distance.toFixed(2)} km`);
      },
      (error) => {
        toast.dismiss();
        toast.error('Failed to get location. Please enter address manually.');
      }
    );
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
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
    
    // Validation: Must have either address OR location
    if (!formData.address && !location) {
      toast.error('Please provide a delivery address or use your current location.');
      return;
    }

    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const orderData = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address || `GPS: ${location.lat}, ${location.lng}`,
        paymentMethod: formData.paymentMethod,
        items: cartItems,
        total: cartTotal + deliveryFee,
        deliveryFee,
        location: location
      };

      console.log("Sending order data:", orderData); // Helps us debug!

      const response = await axios.post(`${API_URL}/orders`, orderData);
      
      toast.success('Order placed successfully! We will contact you shortly.');
      clearCart();
      
      // Optional: redirect to a success page or home
      // window.location.href = '/';
      
    } catch (error) {
      console.error("Order placement failed:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || 'Failed to place order. Please check your connection and try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold text-brand-brown mb-4">Your cart is empty</h1>
        <a href="/products" className="bg-brand-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
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
              <label className="block text-sm font-semibold text-brand-brown mb-2">
                Delivery Address {location ? '(Optional - Location Detected)' : '*'}
              </label>
              <textarea
                required={!location} // <-- THIS MAKES IT OPTIONAL IF LOCATION IS USED
                placeholder={location ? "Add any extra delivery instructions (optional)" : "Enter your full delivery address"}
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
                <FaMapMarkerAlt /> {location ? 'Update My Current Location' : 'Use My Current Location'}
              </button>
              {location && (
                <p className="text-sm text-brand-green mt-2 font-semibold">
                  ✓ Location detected! Distance: {location.distance} km | Delivery Fee: KES {deliveryFee}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Payment Method *</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mpesa"
                    checked={formData.paymentMethod === 'mpesa'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  />
                  <span>M-Pesa (STK Push)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
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
              <span>KES {cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>KES {deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2 mt-2">
              <span>Total</span>
              <span className="text-brand-green">KES {(cartTotal + deliveryFee).toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-green text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
}