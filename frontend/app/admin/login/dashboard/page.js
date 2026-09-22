'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaPlus, FaBox, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('add');
  const [orders, setOrders] = useState([]);
  const [productForm, setProductForm] = useState({
    name: '', price: '', category: 'cookies', description: '', image: ''
  });
  const [loading, setLoading] = useState(false);

  // Protect route: Redirect if not logged in
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('mawolangalan_admin')) {
      router.push('/admin/login');
    } else {
      fetchOrders();
    }
  }, [router]);

  const fetchOrders = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/admin/orders`);
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...productForm, price: Number(productForm.price) })
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('Product added successfully!');
        setProductForm({ name: '', price: '', category: 'cookies', description: '', image: '' });
      } else {
        toast.error('Failed to add product');
      }
    } catch (error) {
      toast.error('Error adding product');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mawolangalan_admin');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-brand-brown">Admin Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700">
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-300">
          <button 
            onClick={() => setActiveTab('add')}
            className={`pb-2 px-4 font-semibold ${activeTab === 'add' ? 'text-brand-green border-b-2 border-brand-green' : 'text-gray-500'}`}
          >
            <FaPlus className="inline mr-2" /> Add Product
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`pb-2 px-4 font-semibold ${activeTab === 'orders' ? 'text-brand-green border-b-2 border-brand-green' : 'text-gray-500'}`}
          >
            <FaShoppingBag className="inline mr-2" /> View Orders ({orders.length})
          </button>
        </div>

        {/* Add Product Tab */}
        {activeTab === 'add' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input type="text" placeholder="Product Name" required value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} className="w-full p-3 border rounded-lg" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="number" placeholder="Price (KES)" required value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} className="w-full p-3 border rounded-lg" />
                <select value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})} className="w-full p-3 border rounded-lg">
                  <option value="cookies">Cookies</option>
                  <option value="cakes">Cakes</option>
                  <option value="pastries">Pastries</option>
                  <option value="brownies">Brownies</option>
                </select>
              </div>
              <input type="text" placeholder="Image URL (e.g., https://...)" value={productForm.image} onChange={(e) => setProductForm({...productForm, image: e.target.value})} className="w-full p-3 border rounded-lg" />
              <textarea placeholder="Description" rows="3" value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} className="w-full p-3 border rounded-lg"></textarea>
              <button type="submit" disabled={loading} className="w-full bg-brand-green text-white py-3 rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-400">
                {loading ? 'Saving...' : 'Save Product'}
              </button>
            </form>
          </div>
        )}

        {/* View Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No orders yet.</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg">{order.fullName}</h3>
                    <p className="text-sm text-gray-600">{order.phone} | {order.address}</p>
                    <p className="text-sm text-gray-500 mt-1">Items: {order.items?.map(i => `${i.name} (x${i.quantity})`).join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-brand-green">KES {order.total}</div>
                    <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mt-1 inline-block">{order.paymentMethod}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}