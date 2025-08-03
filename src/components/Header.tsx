'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-black/5' 
        : 'bg-gradient-to-b from-black/20 via-black/10 to-transparent backdrop-blur-lg border-b border-white/10'
    }`}>
      {/* Background glow effect */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isScrolled ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-teal-500/5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group navbar-float">
            <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 navbar-glow ${
              isScrolled 
                ? 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/25' 
                : 'bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/10'
            }`}>
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
                isScrolled ? 'opacity-0' : 'opacity-100'
              }`}>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent"></div>
              </div>
              <span className="relative text-white font-bold text-xl">T</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-bold transition-all duration-500 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                TravelGuide
              </span>
              <span className={`text-xs font-medium transition-all duration-500 ${
                isScrolled ? 'text-gray-500' : 'text-white/70'
              }`}>
                Discover • Explore • Experience
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { href: '/guides', label: 'All Guides' },
              { href: '/how-it-works', label: 'How It Works' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' }
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group nav-link-hover nav-item-hover ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {/* Hover effect background */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' 
                    : 'bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm'
                }`}></div>
                {/* Subtle border on hover */}
                <div className={`absolute inset-0 rounded-lg border transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                  isScrolled ? 'border-blue-200' : 'border-white/20'
                }`}></div>
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              href="/guide/signup" 
              className={`relative px-6 py-3 font-semibold rounded-xl transition-all duration-300 group overflow-hidden ${
                isScrolled 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              <span className="relative z-10">Become a Guide</span>
              {/* Animated background */}
              <div className={`absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                isScrolled 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50' 
                  : 'bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm'
              }`}></div>
            </Link>
            
            <Link 
              href="/login" 
              className={`relative px-6 py-3 font-semibold rounded-xl transition-all duration-300 group overflow-hidden shadow-lg ${
                isScrolled 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-500/25' 
                  : 'bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white border border-white/30 hover:from-white/30 hover:to-white/20 shadow-black/10'
              }`}
            >
              <span className="relative z-10">Sign In</span>
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-3 rounded-xl transition-all duration-300 group ${
              isScrolled 
                ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/20'
            }`}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`md:hidden border-t backdrop-blur-xl transition-all duration-500 mobile-menu-enter ${
            isScrolled 
              ? 'border-gray-200 bg-white/95' 
              : 'border-white/20 bg-gradient-to-b from-black/30 to-black/20'
          }`}>
            <div className="px-4 py-6 space-y-4">
              {[
                { href: '/guides', label: 'All Guides' },
                { href: '/how-it-works', label: 'How It Works' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                      : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 space-y-3">
                <Link
                  href="/guide/signup"
                  className={`block px-4 py-3 rounded-xl font-semibold text-center transition-all duration-300 ${
                    isScrolled 
                      ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50' 
                      : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Become a Guide
                </Link>
                
                <Link
                  href="/login"
                  className={`block px-6 py-3 rounded-xl font-semibold text-center transition-all duration-300 shadow-lg ${
                    isScrolled 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800' 
                      : 'bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white border border-white/30 hover:from-white/30 hover:to-white/20'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
