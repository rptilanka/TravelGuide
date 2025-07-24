'use client';

import React, { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; animationDelay: number }>>([]);

  useEffect(() => {
    // Generate random particles
    const particleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 6
    }));
    setParticles(particleArray);
  }, []);

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.animationDelay}s`
          }}
        />
      ))}
      
      {/* Additional animated elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-20 h-20 bg-blue-300/20 rounded-full animate-float"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-green-300/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-purple-300/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-yellow-300/30 rotate-45 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-3/4 right-10 w-6 h-6 bg-pink-300/30 rotate-12 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

export default AnimatedBackground;
