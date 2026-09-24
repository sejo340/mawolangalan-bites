import ProductsClient from '@/components/ProductsClient';

// This is a Server Component. It fetches data instantly before sending HTML to the browser.
export default async function ProductsPage() {
  let initialProducts = [];

  try {
    // We use Next.js built-in caching. It fetches once and caches for 60 seconds, 
    // making subsequent clicks INSTANT.
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${API_URL}/products`, { 
      next: { revalidate: 60 } // Re-fetch every 60 seconds to keep data fresh but instant
    });
    
    if (res.ok) {
      const data = await res.json();
      initialProducts = data.products || [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  // Pass the instantly fetched data to the client component
  return <ProductsClient initialProducts={initialProducts} />;
}