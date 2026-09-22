export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center">
      <div className="text-center">
        {/* Animated Cookie Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-brand-green rounded-full flex items-center justify-center animate-pulse">
            <svg 
              className="w-16 h-16 text-white" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 110-2 1 1 0 010 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"/>
            </svg>
          </div>
          <div className="absolute inset-0 bg-brand-green rounded-full animate-ping opacity-75"></div>
        </div>
        
        <h2 className="text-2xl font-heading font-bold text-brand-brown mb-2">
          Preparing Something Delicious...
        </h2>
        <p className="text-gray-600">
          Baking your experience with love 🍪
        </p>
        
        {/* Progress Bar */}
        <div className="mt-6 w-48 h-1 bg-gray-300 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-brand-green animate-[shimmer_1.5s_infinite] rounded-full"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}