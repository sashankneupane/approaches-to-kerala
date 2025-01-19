'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Hero from '@/components/hero';
import { motion } from 'framer-motion';

export default function SilhouettesOfKerala() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const imageSection = document.getElementById('main-image');
      if (!imageSection) return;

      const rect = imageSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startY = rect.top - windowHeight;
      const totalDistance = rect.height + windowHeight;
      const progress = Math.max(0, Math.min(1, -startY / totalDistance));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen w-full bg-black text-gray-100">
      <Hero
        images={["/photos/silhouettes-of-kerala/cover.jpg"]}
        title="Silhouettes of Kerala"
        description="An exploration of Kerala's people and the spaces they occupy"
      />

      <div className="w-full">
        {/* Project Description */}
        <motion.section 
          className="max-w-3xl mx-auto px-6 py-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xl leading-relaxed text-gray-300">
            This zine captures two sides of Kerala: its people and its spaces. It explores 
            the generosity and warmth of the people—the way they connect, share, and welcome 
            others into their lives. At the same time, it reflects on the spaces they inhabit, 
            showing how the design of homes, buildings, and public areas tells a story of 
            Kerala&apos;s place in the world.
          </p>
        </motion.section>

        {/* Full Screen Image Display */}
        <motion.div
          id="main-image"
          className="relative w-full mt-32"
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Gradient Overlays */}
          <div className="absolute inset-0 z-10">
            {/* Top gradient */}
            <div 
              className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/30 to-transparent"
              style={{ opacity: 0.3 + scrollProgress * 0.3 }}
            />
            {/* Bottom gradient */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/30 to-transparent"
              style={{ opacity: 0.3 + scrollProgress * 0.3 }}
            />
            {/* Radial gradient that follows scroll */}
            <div 
              className="absolute inset-0 bg-radial-gradient"
              style={{ 
                background: `radial-gradient(circle at 50% ${50 + scrollProgress * 20}%, transparent 50%, rgba(0,0,0,${0.2 + scrollProgress * 0.3}) 100%)`,
                mixBlendMode: 'multiply'
              }}
            />
          </div>
          
          {/* Main Image with full width */}
          <div className="relative w-full">
            <Image
              src="/photos/silhouettes-of-kerala/info.png"
              alt="Silhouettes of Kerala"
              className="w-full h-auto"
              width={2000}
              height={2000}
              style={{
                maxWidth: '100%',
                display: 'block'
              }}
            />
          </div>

          {/* Subtle Ambient Effects */}
          <motion.div 
            className="absolute inset-0 z-20 w-full h-full pointer-events-none"
            animate={{
              background: [
                'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)',
                'linear-gradient(45deg, transparent 60%, rgba(255,255,255,0.03) 70%, transparent 80%)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Artistic Quote */}
        <motion.section 
          className="relative z-30 mt-8 text-center px-6 pb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-2xl font-light text-gray-300/90 italic max-w-2xl mx-auto">
            &quot;Through the lens of architecture and human connection, 
            we discover the soul of Kerala—a place where tradition 
            and hospitality shape every corner of life.&quot;
          </blockquote>
          <p className="mt-4 text-gray-400">— Abdelrahman Khater</p>
        </motion.section>

        {/* Lighter Flowing Lines Effect */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/3 to-transparent"
              style={{
                top: `${(i + 1) * 12.5}%`,
                width: '200%',
                left: '-50%',
              }}
              animate={{
                x: ['-50%', '0%'],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
