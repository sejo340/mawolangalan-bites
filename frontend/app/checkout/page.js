'use client';
import { useState } from 'react';
import { useCart } from '@/components/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaWhatsapp, FaCheckCircle, FaSpinner, FaMobileAlt } from 'react-icons/fa';
import { trackEvent } from '@/utils/analytics'; // <-- Added tracking

// ==========================================
// CLIENT PAYMENT DETAILS (UPDATE THESE!)
// ==========================================
const CLIENT_TILL_NUMBER = "1696232"; 
const CLIENT_BUSINESS_NAME = "MAWOLANGALAN BITES"; 
// ==========================================

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    paymentMethod: 'mpesa' 
  });
  const [location, setLocation] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetchingAddress, setFetchingAddress] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setFetchingAddress(true);
    toast.loading('Finding your location and address...');
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const bakeryLat = -1.2921;
        const bakeryLng = 36.8219;
        const distance = calculateDistance(latitude, longitude, bakeryLat, bakeryLng);
        const fee = Math.max(100, Math.ceil(distance) * 50); 
        
        setLocation({ lat: latitude, lng: longitude, distance: distance.toFixed(2) });
        setDeliveryFee(fee);

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {
            headers: { 'User-Agent': 'MawolangalanBites/1.0' }
          });
          const data = await response.json();
          
          if (data && data.address) {
            const addr = data.address;
            const readableAddress = [
              addr.road,
              addr.suburb || addr.neighbourhood || addr.hamlet,
              addr.city || addr.town || addr.county || 'Nairobi'
            ].filter(Boolean).join(', ');
            
            setFormData(prev => ({ ...prev, address: readableAddress }));
          } else {
            setFormData(prev => ({ ...prev, address: "Current Location (GPS Detected)" }));
          }
        } catch (error) {
          setFormData(prev => ({ ...prev, address: "Current Location (GPS Detected)" }));
        }

        setFetchingAddress(false);
        toast.dismiss();
        toast.success('Location and address found!');
      },
      (error) => {
        setFetchingAddress(false);
        toast.dismiss();
        toast.error('Failed to get location. Please enter address manually.');
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
    
    if (!formData.address.trim()) {
      toast.error('Please provide a delivery address or use the location button.');
      return;
    }

    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const orderData = {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        items: cartItems,
        total: cartTotal + deliveryFee,
        deliveryFee,
        location: location
      };

      await axios.post(`${API_URL}/orders`, orderData);
      
      // Track successful purchase
      trackEvent('purchase', {
        total: orderData.total,
        items_count: cartItems.length,
        payment_method: formData.paymentMethod,
        delivery_fee: deliveryFee
      });

      setLastOrder(orderData);
      clearCart();
      setOrderSuccess(true);
      toast.success('Order saved successfully!');
      
    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sendToWhatsApp = () => {
    if (!lastOrder) return;
    
    const phoneNumber = "254784437428"; 
    
    const itemsList = lastOrder.items.map(item => 
      `- ${item.name} (x${item.quantity}) = KES ${item.price * item.quantity}`
    ).join('%0A');
    
    const subtotal = lastOrder.total - lastOrder.deliveryFee;

    let paymentText = 'Cash on Delivery';
    if (lastOrder.paymentMethod === 'mpesa') paymentText = 'M-Pesa (STK Push)';
    if (lastOrder.paymentMethod === 'till') paymentText = `M-Pesa Till (${CLIENT_TILL_NUMBER})`;

    const message = `*NEW ORDER FROM WEBSITE* %0A%0A` +
      `*Name:* ${lastOrder.fullName}%0A` +
      `*Phone:* ${lastOrder.phone}%0A` +
      `*Address:* ${lastOrder.address}%0A%0A` +
      `*Order Details:*%0A${itemsList}%0A%0A` +
      `*Subtotal:* KES ${subtotal}%0A` +
      `*Delivery Fee:* KES ${lastOrder.deliveryFee}%0A` +
      `*TOTAL:* KES ${lastOrder.total}%0A%0A` +
      `*Payment Method:* ${paymentText}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (orderSuccess && lastOrder) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center bg-brand-cream">
        <FaCheckCircle className="text-6xl text-brand-green mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6 max-w-md">
          Thank you, {lastOrder.fullName}! To confirm your delivery and track your order, please send the details below to our WhatsApp.
        </p>
        
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 max-w-md w-full text-left">
          <h3 className="font-bold text-brand-brown mb-3 border-b pb-2">Order Summary:</h3>
          <ul className="space-y-2 mb-4">
            {lastOrder.items.map((item, index) => (
              <li key={index} className="flex justify-between text-sm text-gray-700">
                <span>{item.name} (x{item.quantity})</span>
                <span>KES {item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-brand-brown border-t pt-2">
            <span>Total</span>
            <span className="text-brand-green">KES {lastOrder.total}</span>
          </div>
        </div>
        
        <button 
          onClick={sendToWhatsApp}
          className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition shadow-lg flex items-center gap-3 mb-6"
        >
          <FaWhatsapp className="text-2xl" /> Send Order to WhatsApp
        </button>
        
        <a href="/" className="text-brand-brown underline hover:text-brand-green">
          Return to Home
        </a>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderSuccess) {
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
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-brown mb-8 text-center">Checkout</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Full Name *</label>
              <input type="text" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Phone Number *</label>
              <input type="tel" required placeholder="0700 000 000" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Delivery Address *</label>
              <textarea 
                required 
                placeholder="e.g., Kasarani Stadium, near the main gate"
                value={formData.address} 
                onChange={(e) => setFormData({...formData, address: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" 
                rows="3" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Auto-Fill My Location</label>
              <button 
                type="button" 
                onClick={getLocation} 
                disabled={fetchingAddress}
                className="w-full bg-brand-gold text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {fetchingAddress ? (
                  <><FaSpinner className="animate-spin" /> Finding Address...</>
                ) : (
                  <><FaMapMarkerAlt /> {location ? 'Update My Location' : 'Use My Current Location'}</>
                )}
              </button>
              {location && <p className="text-sm text-brand-green mt-2 font-semibold">✓ Distance: {location.distance} km | Fee: KES {deliveryFee}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Payment Method *</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                  <input type="radio" name="paymentMethod" value="mpesa" checked={formData.paymentMethod === 'mpesa'} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} className="w-4 h-4 text-brand-green" />
                  <span className="font-medium">M-Pesa (STK Push)</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                  <input type="radio" name="paymentMethod" value="till" checked={formData.paymentMethod === 'till'} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} className="w-4 h-4 text-brand-green" />
                  <span className="font-medium">M-Pesa Till Number</span>
                </label>
                
                {formData.paymentMethod === 'till' && (
                  <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg ml-7">
                    <div className="flex items-center gap-2 mb-2">
                      <FaMobileAlt className="text-brand-green text-xl" />
                      <p className="font-bold text-brand-brown">Lipa Na M-Pesa</p>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">Buy Goods and Services</p>
                    
                    <p className="text-2xl font-bold text-brand-green my-2 tracking-wider">Till Number: {CLIENT_TILL_NUMBER}</p>
                    
                    <p className="text-xs text-gray-500">Business Name: {CLIENT_BUSINESS_NAME}</p>
                  </div>
                )}

                <label className="flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} className="w-4 h-4 text-brand-green" />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-brand-cream rounded-lg">
            <div className="flex justify-between mb-2"><span>Subtotal</span><span>KES {cartTotal.toLocaleString()}</span></div>
            <div className="flex justify-between mb-2"><span>Delivery Fee</span><span>KES {deliveryFee.toLocaleString()}</span></div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2 mt-2"><span>Total</span><span className="text-brand-green">KES {(cartTotal + deliveryFee).toLocaleString()}</span></div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-brand-green text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition mt-6 disabled:bg-gray-400">
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
}