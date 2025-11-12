'use client'; // For client-side effects

import { useState, useEffect } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Parallax pages={3} style={{ top: '0', left: '0' }}>
      <ParallaxLayer offset={0} speed={0.2} style={{ backgroundColor: '#0f0f0f' }}>
        <div className="flex h-screen items-center justify-center" style={{ animation: 'fadeIn 2s ease-in-out' }}>
          <h1 className="text-5xl font-bold text-white">Pineal Vision</h1>
        </div>
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={0.5}>
        <div 
          className="h-screen flex items-center justify-center"
          style={{ 
            background: `radial-gradient(circle, cyan, purple, magenta, yellow, white)`,
            backgroundSize: '400% 400%',
            animation: `swirl 60s ease-in-out infinite`,
            opacity: scrollY / 1000 // Fade based on scroll
          }}
        >
          <p className="text-3xl text-white" style={{ animation: 'fadeIn 1s ease-in' }}>Scroll for gradient magic</p>
        </div>
      </ParallaxLayer>
      <ParallaxLayer offset={2} speed={1}>
        <div className="h-screen flex items-center justify-center bg-gray-800" style={{ animation: 'fadeIn 2s ease-in-out' }}>
          <p className="text-2xl text-white">Add stereoscopic exercises here</p>
        </div>
      </ParallaxLayer>
    </Parallax>
  );
}
