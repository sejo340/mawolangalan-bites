'use client';
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello Mawolangalan Bites! I have an inquiry.");
    window.open(`https://wa.me/254784437428?text=${message}`, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:mawolangalanbites@gmail.com?subject=Inquiry from Website";
  };

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-center text-brand-brown mb-4">Get in Touch</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Have a question about our cookies, want a custom cake, or need bulk orders for an event? We'd love to hear from you!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* WhatsApp Card */}
          <div 
            onClick={handleWhatsAppClick}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer border-2 border-transparent hover:border-green-500 group text-center"
          >
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500 transition">
              <FaWhatsapp className="text-4xl text-green-600 group-hover:text-white transition" />
            </div>
            <h2 className="text-2xl font-bold text-brand-brown mb-2">Chat on WhatsApp</h2>
            <p className="text-gray-600 mb-4">The fastest way to reach us! Click to start a chat.</p>
            <span className="text-green-600 font-bold text-lg">+254 784 437 428</span>
          </div>

          {/* Email Card */}
          <div 
            onClick={handleEmailClick}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer border-2 border-transparent hover:border-brand-brown group text-center"
          >
            <div className="bg-brand-cream w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-brown transition">
              <FaEnvelope className="text-4xl text-brand-brown group-hover:text-white transition" />
            </div>
            <h2 className="text-2xl font-bold text-brand-brown mb-2">Send us an Email</h2>
            <p className="text-gray-600 mb-4">For formal inquiries, bulk orders, and partnerships.</p>
            <span className="text-brand-brown font-bold text-lg break-all">mawolangalanbites@gmail.com</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white p-8 rounded-2xl shadow-md text-center">
          <h3 className="text-xl font-bold text-brand-brown mb-4">Visit Our Bakery</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-brand-gold" />
              <span>Nairobi, Kenya</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-brand-gold" />
              <span>+254 784 437 428</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}