'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageData {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  width?: number;
  height?: number;
}

type LayoutType = 'B' | 'S' | 'M';

interface PhotoGridProps {
  images: ImageData[];
  className?: string;
  enableFullScreen?: boolean;
  type?: LayoutType;
  showLayoutToggle?: boolean;
  showTitle?: boolean;
  showSubtitle?: boolean;  // Added showSubtitle prop
}

const FullScreenImage = ({ src, alt, title, subtitle, description, onClose }: { 
  src: string; 
  alt?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  onClose: () => void 
}) => {
  const [, setDimensions] = useState({ width: 0, height: 0 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      <motion.div
        className="relative w-full h-full max-h-screen flex items-center justify-center p-4"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="relative group max-w-full max-h-full">
          <Image
            src={src}
            alt={alt || ""}
            className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-lg"
            width={1200}
            height={800}
            priority
            onLoadingComplete={({ naturalWidth, naturalHeight }) => 
              setDimensions({ width: naturalWidth, height: naturalHeight })}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent rounded-lg" />
          {(title || subtitle || description) && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 rounded-b-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="max-w-full [text-shadow:_0_1px_3px_rgba(0,0,0,0.9)]">
                {title && <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white mb-1 md:mb-2">{title}</h2>}
                {subtitle && <h3 className="text-sm md:text-base lg:text-lg text-white mb-1 md:mb-2">{subtitle}</h3>}
                {description && <p className="text-xs md:text-sm lg:text-base text-white/95 leading-relaxed line-clamp-3">{description}</p>}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function PhotoGrid({
  images,
  className = "",
  enableFullScreen = true,
  type,
  showLayoutToggle,
  showTitle = true  // Default to true for backward compatibility
}: PhotoGridProps) {
  const [layout, setLayout] = useState<LayoutType>(type || 'M');
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isInView, setIsInView] = useState(true); // Changed default to true
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only update isInView when element leaves viewport completely
        if (!entry.isIntersecting) {
          setIsInView(false);
        } else {
          setIsInView(true);
        }
      },
      {
        threshold: 0,
        rootMargin: '0px'
      }
    );

    const currentRef = gridRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [layout]); // Add layout as dependency to re-observe after layout changes

  const getGridClass = () => {
    switch(layout) {
      case 'B':
        return 'grid grid-cols-1 md:grid-cols-2 gap-6';
      case 'S':
        return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';
      case 'M':
      default:
        return 'columns-1 md:columns-2 lg:columns-3 gap-4';
    }
  };

  return (
    <div ref={gridRef} className="relative min-h-[200px]"> {/* Added min-height to ensure visibility */}
      <AnimatePresence>
        {isInView && showLayoutToggle && (
          <motion.div 
            className="fixed bottom-4 right-4 z-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-black/40 hover:bg-black/60 rounded-full p-1 backdrop-blur-sm">
              <div className="flex flex-col gap-2">
                {['B', 'S', 'M'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLayout(l as LayoutType)}
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                  layout === l 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/40 hover:text-white'
                  }`}
                >
                  {l}
                </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`${getGridClass()} ${className}`}>
        {images.map((image, idx) => (
          <motion.div
            key={image.src}
            className={`relative ${layout !== 'M' ? 'aspect-square' : 'mb-4'} group`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <div 
              className="relative h-full overflow-hidden rounded-lg cursor-pointer"
              onClick={() => enableFullScreen && setSelectedImage(image)}
            >
              <Image
                src={image.src}
                alt={image.alt || ""}
                width={800}
                height={800}
                className={`w-full h-full object-cover ${layout !== 'M' ? 'aspect-square' : ''}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="transform transition-all duration-300 group-hover:translate-y-[-8px] [text-shadow:_0_1px_3px_rgba(0,0,0,0.9)]">
                    {image.title && (
                      <h3 className={`text-white font-medium text-lg mb-1 transition-all duration-300
                        ${!showTitle ? 'opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0' : 'opacity-100'}
                      `}>
                        {image.title}
                      </h3>
                    )}
                    {image.subtitle && (
                      <h4 className={`text-white text-sm mb-3 transition-all duration-300
                        ${!showTitle ? 'opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0' : 'opacity-90'}
                      `}>
                        {image.subtitle}
                      </h4>
                    )}
                    {image.description && (
                      <p className="text-white/90 text-sm transform transition-all duration-300 
                        opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <FullScreenImage
            src={selectedImage.src}
            alt={selectedImage.alt}
            title={selectedImage.title}
            subtitle={selectedImage.subtitle}
            description={selectedImage.description}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}