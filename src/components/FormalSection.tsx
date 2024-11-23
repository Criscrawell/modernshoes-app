import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface FormalSectionProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export default function FormalSection({ products, onProductClick }: FormalSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % products.length);
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + products.length) % products.length);
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">Formal Collection</h2>
      <div
        className="relative overflow-hidden rounded-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-full"
              onClick={() => onProductClick(product)}
            >
              <div className="relative aspect-[16/9] overflow-hidden group cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 w-full text-white transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                    <p className="text-lg mb-4">${product.price}</p>
                    <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-colors transform hover:scale-105">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-all transform hover:scale-110 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-all transform hover:scale-110 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}