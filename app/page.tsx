'use client'; // For client-side interactivity and hooks

import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useRef, useState, useEffect } from 'react';
import { animated } from '@react-spring/web';
import dynamic from 'next/dynamic';
import { loadSlim } from 'tsparticles-slim';

const Particles = dynamic(() => import('react-particles'), { ssr: false });

export default function Home() {
  const parallaxRef = useRef(null);
  const [opacity, setOpacity] = useState(1); // Background starts fully visible

  // Fade the background opacity on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setOpacity(Math.max(1 - scrollTop / 600, 0.3)); // Fades over ~600px to 30% opacity; adjust as needed
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ width: '100%', height: '300vh', backgroundColor: '#000' }}> {/* Dark base + tall for scrolling */}
      <Particles
        id="tsparticles"
        init={async (engine) => await loadSlim(engine)}
        options={{
          particles: {
            number: { value: 50 },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 3 } },
            move: { enable: true, speed: 0.5, direction: 'none', random: true },
          },
          interactivity: { detectsOn: 'canvas', modes: { push: { quantity: 4 } } },
          style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
        }}
      />
      <Parallax ref={parallaxRef} pages={3}>
        {/* Fading, breathing gradient background layer */}
        <ParallaxLayer offset={0} speed={0.1}>
          <animated.div
            style={{
              background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
              width: '100%',
              height: '100%',
              opacity, // Ties to state for smooth fade
              animation: 'breathe 20s ease-in-out infinite', // Breathing effect
            }}
          />
        </ParallaxLayer>

        {/* First content layer */}
        <ParallaxLayer offset={0} speed={0.2} style={{ backgroundColor: '#0f0f0f' }}>
          <div className="flex h-screen items-center justify-center" style={{ animation: 'fadeIn 2s ease-in-out' }}>
            <h1 className="text-5xl font-bold text-white">Pineal Vision</h1>
          </div>
        </ParallaxLayer>

        {/* Second layer with swirling radial gradient */}
        <ParallaxLayer offset={1} speed={0.5}>
          <div
            className="h-screen flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, cyan, purple, magenta, yellow, white)',
              backgroundSize: '400% 400%',
              animation: 'swirl 60s ease-in-out infinite',
              opacity, // Use the same opacity state for consistent fade
            }}
          >
            <p className="text-3xl text-white" style={{ animation: 'fadeIn 1s ease-in' }}>Scroll for gradient magic</p>
          </div>
        </ParallaxLayer>

        {/* Third layer for stereoscopic exercises */}
        <ParallaxLayer offset={2} speed={1}>
          <div className="h-screen flex items-center justify-center bg-gray-800" style={{ animation: 'fadeIn 2s ease-in-out' }}>
            <p className="text-2xl text-white">Add stereoscopic exercises here</p>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
