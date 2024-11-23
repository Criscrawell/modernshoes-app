import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="product-card bg-white rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">
            {product.name}
          </h3>
          <p className="text-lg font-semibold">${product.price}</p>
        </div>
        
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < product.rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">
            ({product.reviews.length} reviews)
          </span>
        </div>
        
        <div className="pt-2">
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="text-sm px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}