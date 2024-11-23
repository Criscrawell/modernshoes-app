import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import FormalSection from './components/FormalSection';
import AIChat from './components/AIChat';
import { Product } from './types';

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic Runner',
    price: 129.99,
    category: 'men',
    type: 'sport',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    description: 'Premium running shoes designed for comfort and performance.',
    sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.5,
    reviews: [
      {
        id: '1',
        userName: 'John D.',
        rating: 5,
        comment: 'Extremely comfortable for long runs!',
        date: '2024-02-15'
      }
    ]
  },
  {
    id: '2',
    name: 'Urban Street',
    price: 149.99,
    category: 'women',
    type: 'casual',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
    description: 'Stylish street shoes perfect for urban lifestyle.',
    sizes: [6, 7, 8, 9, 10],
    rating: 4.8,
    reviews: [
      {
        id: '2',
        userName: 'Sarah M.',
        rating: 5,
        comment: 'Love the style and comfort!',
        date: '2024-02-10'
      }
    ]
  },
  {
    id: '3',
    name: 'Sport Elite',
    price: 159.99,
    category: 'men',
    type: 'sport',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
    description: 'High-performance athletic shoes for serious athletes.',
    sizes: [8, 9, 10, 11, 12],
    rating: 4.7,
    reviews: [
      {
        id: '3',
        userName: 'Mike R.',
        rating: 4,
        comment: 'Great for training!',
        date: '2024-02-05'
      }
    ]
  },
  {
    id: '4',
    name: 'Oxford Elite',
    price: 199.99,
    category: 'men',
    type: 'formal',
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1',
    description: 'Classic Oxford shoes crafted from premium leather.',
    sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.9,
    reviews: [
      {
        id: '4',
        userName: 'James B.',
        rating: 5,
        comment: 'Perfect for formal occasions!',
        date: '2024-02-20'
      }
    ]
  },
  {
    id: '5',
    name: 'Elegant Heel',
    price: 179.99,
    category: 'women',
    type: 'formal',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
    description: 'Sophisticated heels for the modern professional woman.',
    sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.8,
    reviews: [
      {
        id: '5',
        userName: 'Emma S.',
        rating: 5,
        comment: 'Comfortable and stylish!',
        date: '2024-02-18'
      }
    ]
  }
];

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<'all' | 'men' | 'women'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = SAMPLE_PRODUCTS.filter(
    product => category === 'all' || product.category === category
  );

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <section className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Your Perfect Fit
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our collection of premium footwear, crafted for style and comfort
            </p>
          </section>

          <section className="mb-16">
            <div className="flex justify-center space-x-4 mb-8">
              {[
                { label: 'All', value: 'all' },
                { label: 'Men', value: 'men' },
                { label: 'Women', value: 'women' }
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setCategory(value as typeof category)}
                  className={`px-6 py-2 rounded-full transition-all transform hover:scale-105 ${
                    category === value
                      ? 'bg-black text-white'
                      : 'border border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-200 rounded-lg h-[400px]"
                  />
                ))}
              </div>
            ) : (
              <ProductGrid
                products={filteredProducts}
                onProductClick={setSelectedProduct}
              />
            )}
          </section>

          <FormalSection
            products={SAMPLE_PRODUCTS.filter(p => p.type === 'formal')}
            onProductClick={setSelectedProduct}
          />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: "Men's Collection",
                image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f"
              },
              {
                title: "Women's Collection",
                image: "https://images.unsplash.com/photo-1554062614-6da4fa67725a"
              }
            ].map((collection) => (
              <div
                key={collection.title}
                className="relative h-[400px] overflow-hidden rounded-lg group"
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center text-white transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                    <h2 className="text-3xl font-bold mb-2">{collection.title}</h2>
                    <button className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors transform hover:scale-105">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </main>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

        <AIChat />

        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="animate-fade-in">
                <h3 className="text-lg font-semibold mb-4">About Us</h3>
                <p className="text-gray-400">
                  Premium footwear for every step of your journey.
                </p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Shipping Policy</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Returns & Exchanges</li>
                  <li className="hover:text-white transition-colors cursor-pointer">FAQ</li>
                </ul>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="hover:text-white transition-colors cursor-pointer">Men's Shoes</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Women's Shoes</li>
                  <li className="hover:text-white transition-colors cursor-pointer">New Arrivals</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Sale</li>
                </ul>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-gray-400 mb-4">
                  Subscribe to receive updates, access to exclusive deals, and more.
                </p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-white text-black rounded-full text-sm hover:bg-gray-100 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;