import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="https://modernshoes.com" className="text-2xl font-bold text-gray-900">MODERN SHOES</a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="https://modernshoes.com" className="text-gray-700 hover:text-gray-900 transition-colors">Home</a>
            <a href="https://modernshoes.com/men" className="text-gray-700 hover:text-gray-900 transition-colors">Men</a>
            <a href="https://modernshoes.com/women" className="text-gray-700 hover:text-gray-900 transition-colors">Women</a>
            <a href="https://modernshoes.com/new" className="text-gray-700 hover:text-gray-900 transition-colors">New Arrivals</a>
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer" />
              {state.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="https://modernshoes.com" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Home</a>
            <a href="https://modernshoes.com/men" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Men</a>
            <a href="https://modernshoes.com/women" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Women</a>
            <a href="https://modernshoes.com/new" className="block px-3 py-2 text-gray-700 hover:text-gray-900">New Arrivals</a>
          </div>
        </div>
      )}
    </nav>
  );
}