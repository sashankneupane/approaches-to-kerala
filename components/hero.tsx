'use client';
import { Macondo } from 'next/font/google';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const customFont = Macondo({
  weight: ['400'],
  subsets: ['latin'],
});

interface HeroProps {
  images: string[];
  title: string;
  description: string;
  imageInterval?: number;
}

export default function Hero({ images, title, description, imageInterval = 5000 }: HeroProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const handleDotClick = (index: number) => {
    setCurrentPhotoIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % images.length);
    }, imageInterval);

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min((scrolled / (windowHeight * 0.8)), 1);
      
      setScrollProgress(progress);
      setIsVisible(progress < 0.9);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [images.length, imageInterval]);

  return (
    <motion.section 
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      animate={{ 
        opacity: 1,
        backgroundColor: `rgba(0, 0, 0, ${scrollProgress * 0.6})`
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Background container */}
      <motion.div 
        className="fixed inset-0 z-0"
        animate={{ 
          opacity: Math.max(1 - scrollProgress * 1.5, 0)
        }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence initial={false} mode='popLayout'>
          <motion.div
            key={currentPhotoIndex}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{ 
                backgroundImage: `url(${images[currentPhotoIndex]})`,
                filter: 'brightness(0.7) saturate(1.2)'
              }}
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>

        {/* Gradients */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"
          style={{ 
            opacity: Math.max(0.8 - scrollProgress, 0)
          }} 
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"
          style={{ 
            opacity: Math.max(0.8 - scrollProgress, 0)
          }} 
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl"
          animate={{ 
            opacity: Math.max(1 - scrollProgress * 2, 0),
            y: scrollProgress * -50
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.h1 
            className={`${customFont.className} text-6xl md:text-4xl lg:text-8xl text-white mb-8 tracking-tight`}
            animate={{ opacity: isVisible ? 1 : 0 }}
          >
            <span className="inline-block">
              {title}
            </span>
          </motion.h1>

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
            {description}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator and dots */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
        animate={{ 
          opacity: Math.max(1 - scrollProgress * 3, 0)
        }}
      >
        <motion.button
          onClick={handleScrollClick}
          className="relative px-6 py-3 cursor-pointer hover:opacity-80 transition-opacity"
          whileHover={{ y: 2 }}
          transition={{ duration: 0.2 }}
        >
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
        </motion.button>

        <motion.button
          onClick={handleScrollClick}
          className="text-white/70 text-sm tracking-[0.3em] uppercase font-light hover:text-white transition-colors cursor-pointer"
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
        </motion.button>
      </motion.div>

      <motion.div 
        className="absolute bottom-12 right-12 z-20"
        animate={{ opacity: Math.max(1 - scrollProgress * 3, 0) }}
      >
        <div className="flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer
                hover:scale-125 hover:bg-white
                ${index === currentPhotoIndex ? 'bg-white scale-110' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
