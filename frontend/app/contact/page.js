'use client';

import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaInstagram, FaFacebook } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-brand-cream py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-brown text-center mb-12">
          Get In Touch
        </h1>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-brand-brown mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-brand-green text-xl mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-brand-brown">Location</h3>
                    <p className="text-gray-600">Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaPhone className="text-brand-green text-xl mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-brand-brown">Phone / WhatsApp</h3>
                    <p className="text-gray-600">+254 784 437 428</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="text-brand-green text-xl mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-brand-brown">Email</h3>
                    <p className="text-gray-600">mawolangalanbites@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaClock className="text-brand-green text-xl mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-brand-brown">Business Hours</h3>
                    <p className="text-gray-600">Mon - Sat: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Sunday: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start pt-4 border-t">
                  <FaInstagram className="text-brand-pink text-xl mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-brand-brown">Instagram</h3>
                    <a href="https://instagram.com/mawolangalan_bites" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">@mawolangalan_bites</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaFacebook className="text-blue-600 text-xl mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-brand-brown">Facebook</h3>
                    <a href="https://facebook.com/mawolangalanbites" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">Mawolangalan Bites</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-brown text-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Custom Orders</h3>
              <p className="mb-4">For custom cakes and special event orders, please contact us at least 3 days in advance via WhatsApp or Email.</p>
              <p className="text-brand-gold font-semibold">We'd love to make your celebration special!</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-brand-brown mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-brand-brown font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-brand-brown font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-brand-brown font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g., 0784 437 428"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-brand-brown font-semibold mb-2">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="order">Place an Order</option>
                  <option value="custom">Custom Cake Inquiry</option>
                  <option value="catering">Catering Services</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-brand-brown font-semibold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}