'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaBirthdayCake, FaWhatsapp } from 'react-icons/fa'; // ✅ Fixed: Changed FaCake to FaBirthdayCake

export default function CustomCakesPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    occasion: '',
    flavor: '',
    size: '',
    design: '',
    date: '',
    additionalNotes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const message = `*CUSTOM CAKE REQUEST* %0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Occasion:* ${formData.occasion}%0A` +
      `*Flavor:* ${formData.flavor}%0A` +
      `*Size:* ${formData.size}%0A` +
      `*Design Description:* ${formData.design}%0A` +
      `*Delivery Date:* ${formData.date}%0A` +
      `*Additional Notes:* ${formData.additionalNotes}`;
    
    const whatsappUrl = `https://wa.me/254784437428?text=${message}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Redirecting to WhatsApp...');
  };

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <FaBirthdayCake className="text-6xl text-brand-green mx-auto mb-4" />
          <h1 className="text-4xl font-heading font-bold text-brand-brown mb-2">
            Custom Cake Request
          </h1>
          <p className="text-gray-600">
            Tell us about your dream cake, and we'll make it happen!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Your Name *</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Phone Number *</label>
              <input type="tel" required placeholder="0700 000 000" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brand-brown mb-2">Occasion *</label>
                <select required value={formData.occasion} onChange={(e) => setFormData({...formData, occasion: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent">
                  <option value="">Select...</option>
                  <option>Birthday</option>
                  <option>Wedding</option>
                  <option>Anniversary</option>
                  <option>Baby Shower</option>
                  <option>Graduation</option>
                  <option>Corporate Event</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-brown mb-2">Preferred Delivery Date *</label>
                <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brand-brown mb-2">Cake Flavor *</label>
                <select required value={formData.flavor} onChange={(e) => setFormData({...formData, flavor: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent">
                  <option value="">Select...</option>
                  <option>Vanilla</option>
                  <option>Chocolate</option>
                  <option>Red Velvet</option>
                  <option>Carrot Cake</option>
                  <option>Black Forest</option>
                  <option>Strawberry</option>
                  <option>Mixed Flavors</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-brown mb-2">Cake Size *</label>
                <select required value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent">
                  <option value="">Select...</option>
                  <option>Small (6-8 people)</option>
                  <option>Medium (10-15 people)</option>
                  <option>Large (20-30 people)</option>
                  <option>Extra Large (40+ people)</option>
                  <option>Custom Size</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Design Description *</label>
              <textarea required rows="4" placeholder="Describe the design, colors, theme, decorations, etc." value={formData.design} onChange={(e) => setFormData({...formData, design: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Additional Notes</label>
              <textarea rows="3" placeholder="Any allergies, special requests, or other details..." value={formData.additionalNotes} onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
            </div>
          </div>

          <button type="submit" className="w-full bg-green-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition mt-8 flex items-center justify-center gap-2">
            <FaWhatsapp /> Send Request via WhatsApp
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            We'll respond within 24 hours with a quote and design confirmation
          </p>
        </form>
      </div>
    </div>
  );
}