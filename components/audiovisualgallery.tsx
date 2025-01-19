'use client';
import React, { useRef, useEffect, useCallback} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AudioVisualGalleryProps {
  isPlaying: boolean;
  images: string[];
  progress: number;
}

export default function AudioVisualGallery({ isPlaying, images, progress }: AudioVisualGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastScrollRef = useRef<number>(0);

  const smoothScroll = useCallback((targetScroll: number) => {
    if (!scrollContainerRef.current) return;

    const animate = () => {
      const currentScroll = lastScrollRef.current;
      const diff = targetScroll - currentScroll;
      const step = diff * 0.03; // Smaller value for smoother movement

      if (Math.abs(diff) > 0.5) {
        lastScrollRef.current = currentScroll + step;
        scrollContainerRef.current!.scrollLeft = lastScrollRef.current;
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        lastScrollRef.current = targetScroll;
        scrollContainerRef.current!.scrollLeft = targetScroll;
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      const targetScroll = (progress / 100) * scrollWidth;
      smoothScroll(targetScroll);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [progress, smoothScroll]);

  return (
    <div className="relative min-h-[80vh] w-full overflow-hidden bg-black">
      <div 
        ref={scrollContainerRef}
        className="flex items-center gap-4 py-32 px-[15vw] overflow-x-auto hide-scrollbar"
      >
        {images.map((image, index) => (
          <motion.div
            key={image}
            className="relative flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: isPlaying ? [0, -3, 3, 0] : 0,
            }}
            transition={{
              opacity: { duration: 2 },
              y: {
                duration: 12,
                repeat: Infinity,
                ease: [0.33, 1, 0.68, 1], // Custom easing for smoother motion
                repeatType: "reverse"
              }
            }}
          >
            <motion.div 
              className="relative w-[45vw] h-[65vh] rounded-xl overflow-hidden"
              style={{
                boxShadow: '0 0 30px rgba(0,0,0,0.5)'
              }}
            >
              <Image
                src={image}
                alt={`Kerala Scene ${index + 1}`}
                fill
                className="object-cover"
                sizes="45vw"
              />

              {/* Smooth flowing lines */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-full h-[1px]"
                    style={{
                      top: `${(i + 1) * 12.5}%`,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                      opacity: isPlaying ? 0.6 : 0.2
                    }}
                    animate={isPlaying ? {
                      x: ['-100%', '100%'],
                    } : {}}
                    transition={{
                      duration: 8 + i,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ))}
              </div>

              {/* Subtle gradient overlay */}
              <motion.div 
                className="absolute inset-0"
                animate={{
                  background: isPlaying 
                    ? ['linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5))',
                       'linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.4))',
                       'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5))']
                    : 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5))'
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Ambient flowing lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px"
            style={{
              width: '200%',
              left: '-50%',
              top: `${(i + 1) * 8}%`,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
              opacity: isPlaying ? 0.8 : 0.2
            }}
            animate={isPlaying ? {
              x: ['-50%', '0%'],
            } : {}}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
