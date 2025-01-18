'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageData {
  src: string;
  alt?: string;
  description?: string;
  width?: number;
  height?: number;
}

interface PhotoGridProps {
  images: ImageData[];
  className?: string;
  enableFullScreen?: boolean;
  defaultLayout?: 'grid' | 'masonry';
  showLayoutToggle?: boolean;
}

const FullScreenImage = ({ src, alt, description, onClose }: { 
  src: string; 
  alt?: string; 
  description?: string;
  onClose: () => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-7xl mx-auto px-4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <Image
          src={src}
          alt={alt || ""}
          className="max-h-[90vh] w-auto object-contain"
          width={1200}
          height={800}
        />
        {description && (
          <p className="text-white/80 text-center mt-4 text-sm">
            {description}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default function PhotoGrid({
  images,
  className = "",
  enableFullScreen = true,
  defaultLayout = 'grid',
  showLayoutToggle = true
}: PhotoGridProps) {
  const [layout, setLayout] = useState(defaultLayout);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isInView, setIsInView] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1 // Toggle will appear when 10% of the grid is visible
      }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const LayoutToggle = () => (
    <AnimatePresence>
      {isInView && (
        <motion.div 
          className="fixed bottom-4 right-4 z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-black/40 hover:bg-black/60 rounded-full p-1 backdrop-blur-sm transition-all duration-300 group flex flex-col">
            {['grid', 'masonry'].map((l) => (
              <button
                key={l}
                onClick={() => setLayout(l as 'grid' | 'masonry')}
                className={`px-2 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                  layout === l 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/40 hover:text-white'
                }`}
              >
                <span>
                  {l.charAt(0).toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderGrid = () => (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {images.map((image, idx) => (
        <motion.div
          key={image.src}
          className="relative aspect-square group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <div 
            className="relative w-full h-full overflow-hidden rounded-lg cursor-pointer"
            onClick={() => enableFullScreen && setSelectedImage(image)}
          >
            <Image
              src={image.src}
              alt={image.alt || ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            {image.description && (
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderMasonry = () => (
    <div className={`columns-2 md:columns-3 lg:columns-4 gap-4 ${className}`}>
      {images.map((image, idx) => (
        <motion.div
          key={image.src}
          className="relative mb-4 break-inside-avoid group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <div 
            className="relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => enableFullScreen && setSelectedImage(image)}
          >
            <Image
              src={image.src}
              alt={image.alt || ""}
              width={800}
              height={800}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {image.description && (
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div ref={gridRef}>
      {showLayoutToggle && <LayoutToggle />}
      {layout === 'grid' ? renderGrid() : renderMasonry()}
      
      <AnimatePresence>
        {selectedImage && (
          <FullScreenImage
            src={selectedImage.src}
            alt={selectedImage.alt}
            description={selectedImage.description}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
