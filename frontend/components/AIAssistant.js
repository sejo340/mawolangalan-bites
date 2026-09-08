'use client';
import { useState } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I\'m your Mawolangalan Bites AI Assistant. How can I help you today? 🍪'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Knowledge base for the AI
  const knowledgeBase = {
    products: {
      keywords: ['product', 'cookie', 'cake', 'brownie', 'pastry', 'what do you sell', 'menu', 'offer'],
      response: 'We offer artisan cookies (Sugar Cookies KES 100, Chocolate Chip KES 120, Red Velvet KES 120), custom cakes, gourmet pastries, and brownies. All made fresh daily with premium ingredients! Would you like to see our full menu?'
    },
    delivery: {
      keywords: ['delivery', 'shipping', 'where', 'how long', 'when', 'time'],
      response: 'We deliver within Nairobi and surrounding areas. Delivery fees are calculated based on distance (KES 50 per km, minimum KES 100). Orders are delivered within 2-4 hours. You can use our "Use My Current Location" feature at checkout for accurate delivery fees!'
    },
    payment: {
      keywords: ['pay', 'payment', 'mpesa', 'till', 'cash', 'how to pay'],
      response: 'We accept M-Pesa (Till Number or STK Push) and Cash on Delivery. At checkout, simply select your preferred payment method. For Till Number payments, the number will be displayed for you to send payment.'
    },
    price: {
      keywords: ['price', 'cost', 'how much', 'expensive', 'cheap'],
      response: 'Our cookies start from KES 100 per piece. Custom cakes and bulk orders are priced based on size and design. You can see exact prices on our Products page. We offer great value for premium quality!'
    },
    order: {
      keywords: ['order', 'buy', 'purchase', 'how to order', 'process'],
      response: 'It\'s easy! 1) Browse our Products page, 2) Click "Add to Cart", 3) Go to Checkout, 4) Fill in your details and delivery address, 5) Choose payment method, 6) Click "Place Order" and send us a WhatsApp message to confirm!'
    },
    contact: {
      keywords: ['contact', 'phone', 'email', 'whatsapp', 'reach', 'talk'],
      response: 'You can reach us via WhatsApp at +254 784 437 428 (fastest response!), email at mawolangalanbites@gmail.com, or use this chat! We\'re here to help!'
    },
    custom: {
      keywords: ['custom', 'special', 'birthday', 'wedding', 'event', 'bulk'],
      response: 'We love custom orders! For birthday cakes, wedding cakes, or bulk orders for events, please WhatsApp us at +254 784 437 428 with your requirements. We create beautiful, personalized designs!'
    },
    fresh: {
      keywords: ['fresh', 'when baked', 'made', 'ingredients', 'quality'],
      response: 'All our products are baked fresh daily using premium, high-quality ingredients. We don\'use preservatives, so you get the freshest, tastiest treats every time!'
    },
    hours: {
      keywords: ['open', 'hours', 'time', 'when', 'close', 'working'],
      response: 'We\'re open Monday-Saturday, 8:00 AM - 6:00 PM. Sunday orders can be placed online for Monday delivery. We recommend ordering at least 2 hours in advance for same-day delivery.'
    },
    location: {
      keywords: ['where', 'located', 'address', 'shop', 'bakery', 'visit'],
      response: 'We\'re based in Nairobi, Kenya. We offer delivery across Nairobi and surrounding areas. For specific location inquiries, please WhatsApp us!'
    }
  };

  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Search through knowledge base
    for (const [category, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return data.response;
      }
    }
    
    // Default response if no match
    return 'Thank you for your question! For more specific assistance, please WhatsApp us at +254 784 437 428 or check out our Products page. Is there anything else I can help you with?';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateResponse(input);
      const botMessage = { sender: 'bot', text: botResponse };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-brand-green text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition z-50 ${isOpen ? 'hidden' : 'flex'}`}
        style={{ width: '60px', height: '60px', alignItems: 'center', justifyContent: 'center' }}
      >
        <FaComments className="text-2xl" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-brand-green text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <FaRobot className="text-brand-green text-xl" />
              </div>
              <div>
                <h3 className="font-bold">Mawolangalan Assistant</h3>
                <p className="text-xs text-green-100">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-brand-green text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="bg-white p-3 rounded-lg rounded-bl-none shadow">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="px-4 py-2 bg-white border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {['Products', 'Delivery', 'Payment', 'Custom Orders'].map((topic) => (
                <button
                  key={topic}
                  onClick={() => setInput(`Tell me about ${topic}`)}
                  className="text-xs bg-brand-cream text-brand-brown px-3 py-1 rounded-full hover:bg-brand-gold transition"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
              <button
                onClick={handleSend}
                className="bg-brand-green text-white p-2 rounded-full hover:bg-green-700 transition"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}