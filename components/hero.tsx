'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { featured_photos } from '@/app/data';

export default function Hero() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Image carousel
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % featured_photos.length);
    }, 3000); // Change image every 5 seconds

    // Enhanced scroll handler with progress
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      // Smoother progress calculation
      const progress = Math.min((scrolled / (windowHeight * 0.8)), 1);
      
      setScrollProgress(progress);
      setIsVisible(progress < 0.9);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.section 
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      animate={{ 
        opacity: 1,
        backgroundColor: `rgba(0, 0, 0, ${scrollProgress * 0.8})` // Smoother background transition
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Image Carousel with Fixed Position and Fade */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentPhotoIndex}
          className="fixed inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: Math.max(1 - scrollProgress * 1.5, 0) // Fade out faster than scroll
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ 
              backgroundImage: `url(/photos/${featured_photos[currentPhotoIndex]}.jpg)`,
              filter: 'brightness(0.7) saturate(1.2)'
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Fixed Gradient Overlays with Dynamic Opacity */}
      <div 
        className="fixed inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"
        style={{ 
          opacity: Math.max(0.8 - scrollProgress, 0)
        }} 
      />
      <div 
        className="fixed inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"
        style={{ 
          opacity: Math.max(0.8 - scrollProgress, 0)
        }} 
      />

      {/* Main Content with Fade Out */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl"
        animate={{ 
          opacity: Math.max(1 - scrollProgress * 2, 0),
          y: scrollProgress * -50 // Slight upward movement while fading
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.h1 
          className="text-6xl md:text-4xl lg:text-8xl text-white font-light mb-8 tracking-tight"
          animate={{ opacity: isVisible ? 1 : 0 }}
        >
          <span className="inline-block">
            Approaches to Kerala
          </span>
        </motion.h1>

        {/* Animated Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1, duration: 1.5 }}
          className="h-px bg-gradient-to-r from-transparent via-white/70 to-transparent max-w-xl mx-auto"
        />

        <motion.p 
          className="text-white/80 text-xl md:text-2xl mt-8 font-light tracking-wide"
          animate={{ opacity: isVisible ? 1 : 0 }}
        >
          Exploring the cultural essence through different mediums
        </motion.p>
      </motion.div>

      {/* Simple Scroll Indicator with Quick Fade */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
        animate={{ 
          opacity: Math.max(1 - scrollProgress * 3, 0) // Fade out quickly
        }}
      >
        <motion.div
          className="relative px-6 py-3"
          whileHover={{ y: 2 }}
          transition={{ duration: 0.2 }}
        >
          {/* Simple animated arrow */}
          <motion.svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
            animate={{
              y: [0, 4, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <path 
              d="M12 4L12 20M12 20L5 13M12 20L19 13" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>

        {/* Scroll text */}
        <motion.span
          className="text-white/70 text-sm tracking-[0.3em] uppercase font-light"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          Scroll
        </motion.span>
      </motion.div>

      {/* Image Counter with Quick Fade */}
      <motion.div 
        className="absolute bottom-12 right-12 z-20"
        animate={{ 
          opacity: Math.max(1 - scrollProgress * 3, 0)
        }}
      >
        <div className="flex gap-2">
          {featured_photos.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                index === currentPhotoIndex ? 'bg-white scale-125' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
