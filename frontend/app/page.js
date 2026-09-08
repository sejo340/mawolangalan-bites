import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFF8E1', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '80px 20px', 
        maxWidth: '1400px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center'
      }}>
        {/* Left Column - Text */}
        <div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 'bold',
            color: '#3E2723',
            marginBottom: '24px',
            lineHeight: '1.1',
            fontFamily: 'Georgia, serif'
          }}>
            Crafting Delicious <br />
            <span style={{ color: '#4CAF50' }}>Memories</span> One Bite at <br />
            a Time
          </h1>
          
          <p style={{ 
            fontSize: '1.125rem',
            color: '#666',
            marginBottom: '40px',
            lineHeight: '1.6',
            maxWidth: '500px'
          }}>
            Artisan cookies, custom cakes, and premium baked goods made with love and the finest ingredients in Kenya.
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '60px'
          }}>
            <Link href="/products" style={{ 
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              display: 'inline-block',
              transition: 'all 0.3s ease'
            }}>
              Order Now
            </Link>
            <Link href="/contact" style={{ 
              backgroundColor: '#5D4037',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              display: 'inline-block',
              transition: 'all 0.3s ease'
            }}>
              Custom Order
            </Link>
          </div>

          {/* Stats */}
          <div style={{ 
            display: 'flex',
            gap: '40px',
            flexWrap: 'wrap'
          }}>
            <div>
              <div style={{ 
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#3E2723',
                marginBottom: '4px'
              }}>
                500+
              </div>
              <div style={{ 
                fontSize: '0.875rem',
                color: '#666'
              }}>
                Happy Customers
              </div>
            </div>
            
            <div>
              <div style={{ 
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#3E2723',
                marginBottom: '4px'
              }}>
                50+
              </div>
              <div style={{ 
                fontSize: '0.875rem',
                color: '#666'
              }}>
                Products
              </div>
            </div>
            
            <div>
              <div style={{ 
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#3E2723',
                marginBottom: '4px'
              }}>
                100%
              </div>
              <div style={{ 
                fontSize: '0.875rem',
                color: '#666'
              }}>
                Fresh Daily
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div style={{ 
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=800&fit=crop" 
            alt="Delicious Chocolate Chip Cookies" 
            style={{ 
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover'
            }}
          />
        </div>
      </section>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 968px) {
          section {
            grid-template-columns: 1fr !important;
            padding: 40px 20px !important;
            gap: 40px !important;
          }
          
          h1 {
            text-align: center !important;
          }
          
          p {
            text-align: center !important;
            margin: 0 auto 40px auto !important;
          }
          
          div[style*="display: 'flex'"][style*="gap: '20px'"] {
            justify-content: center !important;
          }
          
          div[style*="display: 'flex'"][style*="gap: '40px'"] {
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}