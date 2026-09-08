import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#FFF8E1',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '60px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              color: '#3E2723',
              marginBottom: '20px',
              lineHeight: '1.2'
            }}>
              Crafting Delicious <br />
              <span style={{ color: '#4CAF50' }}>Memories</span> One Bite at a Time
            </h1>
            <p style={{ 
              fontSize: '1.125rem',
              color: '#666',
              marginBottom: '30px'
            }}>
              Artisan cookies, custom cakes, and premium baked goods made with love and the finest ingredients in Kenya.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              <Link href="/products" style={{ 
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                display: 'inline-block'
              }}>
                Order Now
              </Link>
              <Link href="/contact" style={{ 
                backgroundColor: '#3E2723',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                display: 'inline-block'
              }}>
                Custom Order
              </Link>
            </div>
          </div>
          <div>
            <div style={{ 
              width: '100%',
              maxWidth: '500px',
              height: '400px',
              backgroundColor: '#FFE4C4',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              fontSize: '120px',
              margin: '0 auto'
            }}>
              🍪
            </div>
            <p style={{ 
              textAlign: 'center',
              color: '#666',
              marginTop: '15px',
              fontSize: '0.9rem'
            }}>
              Delicious Cookies
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          marginTop: '80px',
          maxWidth: '900px',
          margin: '80px auto 0'
        }}>
          <div style={{ 
            textAlign: 'center',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#4CAF50',
              marginBottom: '10px'
            }}>
              500+
            </div>
            <div style={{ color: '#666', fontSize: '1rem' }}>
              Happy Customers
            </div>
          </div>
          
          <div style={{ 
            textAlign: 'center',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#4CAF50',
              marginBottom: '10px'
            }}>
              50+
            </div>
            <div style={{ color: '#666', fontSize: '1rem' }}>
              Products
            </div>
          </div>
          
          <div style={{ 
            textAlign: 'center',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#4CAF50',
              marginBottom: '10px'
            }}>
              100%
            </div>
            <div style={{ color: '#666', fontSize: '1rem' }}>
              Fresh Daily
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section style={{ 
        padding: '80px 20px',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#3E2723',
            marginBottom: '50px'
          }}>
            Our Specialties
          </h2>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            <div style={{
              backgroundColor: '#FFF8E1',
              padding: '40px 30px',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🍪</div>
              <h3 style={{ fontSize: '1.5rem', color: '#3E2723', marginBottom: '10px' }}>Classic Cookies</h3>
              <p style={{ color: '#666' }}>Fresh baked daily with premium chocolate</p>
            </div>
            
            <div style={{
              backgroundColor: '#FFF8E1',
              padding: '40px 30px',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}></div>
              <h3 style={{ fontSize: '1.5rem', color: '#3E2723', marginBottom: '10px' }}>Custom Cakes</h3>
              <p style={{ color: '#666' }}>Made to order for special occasions</p>
            </div>
            
            <div style={{
              backgroundColor: '#FFF8E1',
              padding: '40px 30px',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🥐</div>
              <h3 style={{ fontSize: '1.5rem', color: '#3E2723', marginBottom: '10px' }}>Gourmet Pastries</h3>
              <p style={{ color: '#666' }}>Flaky, buttery, and delicious</p>
            </div>
            
            <div style={{
              backgroundColor: '#FFF8E1',
              padding: '40px 30px',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}></div>
              <h3 style={{ fontSize: '1.5rem', color: '#3E2723', marginBottom: '10px' }}>Brownies</h3>
              <p style={{ color: '#666' }}>Rich, fudgy, and irresistible</p>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link href="/products" style={{ 
              backgroundColor: '#3E2723',
              color: 'white',
              padding: '15px 40px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              display: 'inline-block'
            }}>
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}