'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';

// Dynamic API URL: Uses the environment variable for production, or localhost for local testing
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [distance, setDistance] = useState(0);
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deliveryAddress: '',
    latitude: null,
    longitude: null,
    paymentMethod: 'mpesa',
    specialInstructions: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setFormData(prev => ({ ...prev, latitude, longitude }));

        try {
          const res = await axios.post(`${API_URL}/orders/calculate-delivery`, {
            latitude, longitude
          });
          setDeliveryFee(res.data.deliveryFee);
          setDistance(res.data.distance);
          toast.success(`Location found! Delivery fee: KES ${res.data.deliveryFee}`);
        } catch (error) {
          toast.error('Failed to calculate delivery fee.');
          console.error(error);
        } finally {
          setLocating(false);
        }
      },
      (error) => {
        toast.error('Please allow location access to calculate delivery fee');
        setLocating(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalTotal = cartTotal + deliveryFee;

      const orderData = {
        ...formData,
        items: cart.map(item => ({ product: item._id, quantity: item.quantity })),
        totalAmount: finalTotal,
        deliveryFee: deliveryFee
      };

      const orderRes = await axios.post(`${API_URL}/orders`, orderData);
      const orderId = orderRes.data.orderId;

      if (formData.paymentMethod === 'mpesa') {
        const phone = formData.customerPhone.startsWith('254') 
          ? formData.customerPhone 
          : `254${formData.customerPhone.slice(1)}`;

        const mpesaRes = await axios.post(`${API_URL}/mpesa/stkpush`, {
          phoneNumber: phone,
          amount: finalTotal,
          orderId: orderId
        });

        if (mpesaRes.data.success) {
          toast.success('Check your phone to complete M-Pesa payment');
          clearCart();
          // router.push(`/order-success?orderId=${orderId}`); 
        }
      } else {
        toast.success('Order placed successfully! Pay on delivery.');
        clearCart();
        // router.push(`/order-success?orderId=${orderId}`);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.error || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-brand-cream py-20 text-center">
        <h1 className="text-4xl font-heading font-bold text-brand-brown mb-8">Your Cart is Empty</h1>
        <button onClick={() => router.push('/products')} className="bg-brand-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-heading font-bold text-brand-brown mb-8 text-center">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
          <div className="space-y-6">
            
            <div>
              <label className="block text-brand-brown font-semibold mb-2">Full Name *</label>
              <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green" />
            </div>
            
            <div>
              <label className="block text-brand-brown font-semibold mb-2">Phone Number *</label>
              <input type="tel" name="customerPhone" value={formData.customerPhone} onChange={handleChange} placeholder="0700 000 000" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green" />
            </div>
            
            <div>
              <label className="block text-brand-brown font-semibold mb-2">Email *</label>
              <input type="email" name="customerEmail" value={formData.customerEmail} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green" />
            </div>
            
            <div>
              <label className="block text-brand-brown font-semibold mb-2">Delivery Address *</label>
              <textarea name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} required rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green" />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label className="block text-brand-brown font-semibold mb-2">Delivery Location</label>
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={locating}
                className="w-full bg-brand-gold text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition flex items-center justify-center disabled:bg-gray-400"
              >
                {locating ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Finding Location...
                  </>
                ) : (
                  <>
                    <FaMapMarkerAlt className="mr-2" /> Use My Current Location
                  </>
                )}
              </button>
              {distance > 0 && (
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Distance: {distance} km | Delivery Fee: <span className="font-bold text-brand-green">KES {deliveryFee}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-brand-brown font-semibold mb-2">Payment Method *</label>
              <div className="space-y-2">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="paymentMethod" value="mpesa" checked={formData.paymentMethod === 'mpesa'} onChange={handleChange} className="mr-3" />
                  <span className="font-semibold">M-Pesa (STK Push)</span>
                </label>
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="mr-3" />
                  <span className="font-semibold">Cash on Delivery</span>
                </label>
              </div>
            </div>

            <div className="bg-brand-cream p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>KES {cartTotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Fee</span>
                <span className="text-brand-green font-semibold">KES {deliveryFee}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span className="text-brand-green">KES {cartTotal + deliveryFee}</span>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-brand-green text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition disabled:bg-gray-400">
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}