'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import TravelGuideLogo from './TravelGuideLogo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: '10%',
            top: '10%',
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-teal-400/15 to-blue-500/15 rounded-full blur-2xl transition-all duration-700 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
            right: '15%',
            top: '20%',
          }}
        />
      </div>

      <header className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-2xl border-b border-gray-200/60 shadow-2xl shadow-black/10' 
          : 'bg-gradient-to-b from-black/30 via-black/15 to-transparent backdrop-blur-2xl border-b border-white/20'
      }`}>
        {/* Animated background gradient */}
        <div className={`absolute inset-0 transition-all duration-700 ease-out ${
          isScrolled ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/8 to-teal-600/10 animate-gradient-x"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"></div>
        </div>

        {/* Floating particles effect */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isScrolled ? 'opacity-0' : 'opacity-60'
        }`}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
              style={{
                left: `${10 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo with advanced animations */}
            <Link href="/" className="flex items-center space-x-3 group relative">
              <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 overflow-hidden ${
                isScrolled 
                  ? 'shadow-xl shadow-blue-500/30' 
                  : 'shadow-2xl shadow-black/20'
              }`}>
                {/* Animated glow effect */}
                <div className={`absolute inset-0 rounded-xl transition-all duration-500 group-hover:scale-125 blur-lg opacity-0 group-hover:opacity-100 ${
                  isScrolled 
                    ? 'bg-blue-400/50' 
                    : 'bg-white/60'
                }`}></div>
                
                {/* Rotating border animation */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 opacity-0 group-hover:opacity-100 group-hover:animate-spin-slow transition-opacity duration-300" style={{mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor'}}></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                
                {/* Travel Guide Logo */}
                <TravelGuideLogo 
                  className="relative w-10 h-10 z-10 group-hover:scale-110 transition-transform duration-300" 
                  isScrolled={isScrolled}
                />
              </div>
              
              <div className="flex flex-col">
                <span className={`text-2xl font-bold transition-all duration-500 group-hover:scale-105 ${
                  isScrolled ? 'text-gray-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-200'
                }`}>
                  TravelGuide
                </span>
                <span className={`text-xs font-medium transition-all duration-500 group-hover:translate-x-1 ${
                  isScrolled ? 'text-gray-500 group-hover:text-blue-500' : 'text-white/70 group-hover:text-white/90'
                }`}>
                  Discover • Explore • Experience
                </span>
              </div>
              
              {/* Floating dots animation */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-75"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-0 group-hover:opacity-60 animation-delay-150"></div>
            </Link>

            {/* Desktop Navigation with enhanced animations */}
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { href: '/guides', label: 'All Guides', icon: '🗺️' },
                { href: '/how-it-works', label: 'How It Works', icon: '⚡' },
                { href: '/about', label: 'About', icon: '🌟' },
                { href: '/contact', label: 'Contact', icon: '💬' }
              ].map((item, index) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`relative px-5 py-3 rounded-xl font-medium transition-all duration-300 group overflow-hidden ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-blue-600' 
                      : 'text-white/90 hover:text-white'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Animated background */}
                  <div className={`absolute inset-0 rounded-xl transition-all duration-500 scale-0 group-hover:scale-100 ${
                    isScrolled 
                      ? 'bg-gradient-to-r from-blue-50 via-blue-100 to-purple-50' 
                      : 'bg-gradient-to-r from-white/20 via-white/30 to-white/20 backdrop-blur-xl'
                  }`}></div>
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-xl transition-all duration-500 opacity-0 group-hover:opacity-100 blur-md ${
                    isScrolled 
                      ? 'bg-gradient-to-r from-blue-400/30 to-purple-400/30' 
                      : 'bg-gradient-to-r from-white/40 to-white/40'
                  }`}></div>
                  
                  {/* Border animation */}
                  <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 ${
                    isScrolled 
                      ? 'border-transparent group-hover:border-blue-200' 
                      : 'border-transparent group-hover:border-white/30'
                  }`}></div>
                  
                  {/* Sliding underline */}
                  <div className={`absolute bottom-0 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8 ${
                    isScrolled ? 'bg-blue-500' : 'bg-white'
                  }`}></div>
                  
                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.icon}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                  </span>
                  
                  {/* Particles on hover */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce ${
                          isScrolled ? 'bg-blue-400' : 'bg-white'
                        }`}
                        style={{
                          left: `${20 + i * 25}%`,
                          top: `${10 + i * 15}%`,
                          animationDelay: `${i * 200}ms`,
                        }}
                      />
                    ))}
                  </div>
                </Link>
              ))}
            </nav>          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              href="/guide/signup" 
              className={`relative px-6 py-3 font-semibold rounded-xl transition-all duration-300 group overflow-hidden shadow-lg ${
                isScrolled 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-blue-500/25' 
                  : 'bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-sm text-white border border-blue-400/30 hover:from-blue-500 hover:to-blue-600 shadow-blue-500/20'
              }`}
            >
              <span className="relative z-10">Become a Guide</span>
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>
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
                  className={`block px-6 py-3 rounded-xl font-semibold text-center transition-all duration-300 shadow-lg ${
                    isScrolled 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700' 
                      : 'bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-sm text-white border border-blue-400/30 hover:from-blue-500 hover:to-blue-600'
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
    </>
  );
}
