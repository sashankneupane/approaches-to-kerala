'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import PhotoGrid from '@/components/photogrid';
import { SketchPicker, ColorResult } from 'react-color';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/hero';

interface ColorEntry {
  file_path: string;
  dominant_color: [number, number, number];
  palette: [number, number, number][];
}

// Simple random shuffle
function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

// Euclidean distance in RGB
function colorDistance(c1: [number, number, number], c2: [number, number, number]) {
  return Math.sqrt(
    Math.pow(c1[0] - c2[0], 2) +
    Math.pow(c1[1] - c2[1], 2) +
    Math.pow(c1[2] - c2[2], 2)
  );
}

// Update the color distance calculation to include palette
// Update getColorScore to handle null color
function getColorScore(info: ColorEntry, targetColor: [number, number, number] | null) {
  if (!targetColor) return Infinity;
  
  const dominantDist = colorDistance(info.dominant_color, targetColor) * 0.7;
  const closestPaletteDist = Math.min(
    ...info.palette.map(color => colorDistance(color, targetColor))
  ) * 0.5;

  return dominantDist + closestPaletteDist;
}

const pickerStyles = {
  default: {
    picker: {
      background: '#1f2937',
      boxShadow: 'none',
      borderRadius: '0.2rem',
      width: '100%', // Make width 100% of container
    },
    saturation: {
      borderRadius: '0.5rem 0.5rem 0 0',
    },
    body: {
      background: '#1f2937',
    },
    input: {
      background: '#374151',
      boxShadow: 'none',
      color: '#fff',
      border: 'none',
    },
    label: {
      color: '#9ca3af',
    },
    hash: {
      color: '#9ca3af',
    }
  }
};

// Add FullScreenImage component
const FullScreenImage = ({ src, onClose }: { src: string; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={onClose}
    >
      <motion.img
        src={src}
        alt=""
        className="max-h-screen max-w-screen-xl object-contain"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      />
      <button
        className="absolute top-4 right-4 text-white text-xl p-2 hover:bg-white/10 rounded-full"
        onClick={onClose}
      >
        ✕
      </button>
    </motion.div>
  );
};

const ViewMode = {
  GRID: 'grid',
  MASONRY: 'masonry',
  FLOW: 'flow'  // Changed from SPIRAL to FLOW
} as const;

type ViewModeType = typeof ViewMode[keyof typeof ViewMode];

// Add this helper function for the flow layout
const getFlowPosition = (
  index: number, 
  total: number, 
  colorScore: number,
  viewportWidth: number,
  viewportHeight: number
) => {
  const golden_ratio = 1.618033988749895;
  const angle = index * golden_ratio * Math.PI * 2;
  
  const normalizedScore = Math.min(colorScore / 400, 1);
  // Smaller base radius but higher spread based on score
  const baseRadius = Math.min(viewportWidth, viewportHeight) * 0.3;
  const radius = baseRadius * (1 - normalizedScore * 0.4);

  let x = Math.cos(angle) * radius;
  let y = Math.sin(angle) * radius;

  const noise = Math.sin(index * golden_ratio) * 20;
  x += noise;
  y += noise;

  x += viewportWidth / 2;
  y += viewportHeight / 2;

  return { x, y, scale: 1 - normalizedScore * 0.3 };
};


// Add NoResults component near other component definitions
const NoResults = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="text-center p-8 min-h-[50vh] flex items-center justify-center"
  >
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-md">
      <h3 className="text-white text-xl font-bold mb-3">No matching images found</h3>
      <p className="text-white/80">
        Try adjusting the threshold slider to find more similar matches. Higher values will include more images that are less exact matches.
      </p>
    </div>
  </motion.div>
);

export default function ColorsOfKeralaPage() {
  const [selectedColor, setSelectedColor] = useState<[number, number, number] | null>(null);
  const [shuffledImages, setShuffledImages] = useState<ColorEntry[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [threshold, setThreshold] = useState(150);
  const [viewMode, setViewMode] = useState<ViewModeType>(ViewMode.GRID);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const DEFAULT_THRESHOLD = 150;
  const [showControls, setShowControls] = useState(true);
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  // Add debounce function
  const debounce = <T extends (...args: unknown[]) => void>(func: T, wait: number): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Update scroll handler with debounce
  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsControlsVisible(scrollPosition > windowHeight * 0.5);
    }, 10); // 10ms debounce

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch colorInfo.json from public directory
  useEffect(() => {
    fetch('/photos/colors-of-kerala/colorinfo.json')
      .then((response) => response.json())
      .then((data: ColorEntry[]) => {
        setShuffledImages(shuffleArray(data));
      })
      .catch((err) => console.error(err));
  }, []);

  // As user picks color in SketchPicker, store it
  const handleColorChange = (color: ColorResult) => {
    setSelectedColor([color.rgb.r, color.rgb.g, color.rgb.b]);
  };

  // Add viewport measurement
  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // For each image, check if it's within threshold of selected color
  // You could also compare all palette colors for a better match
  const sortedImages = useMemo(() => {
    if (!selectedColor) return shuffledImages;
    
    return [...shuffledImages].sort((a, b) => {
      const scoreA = getColorScore(a, selectedColor);
      const scoreB = getColorScore(b, selectedColor);
      return scoreA - scoreB;
    });
  }, [shuffledImages, selectedColor]);

  const renderControls = () => (
    <AnimatePresence>
      {isControlsVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-40 flex flex-col gap-4"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "tween", duration: 0.2 }}
          style={{ willChange: "transform, opacity" }}
        >
          <AnimatePresence>
            {showControls ? (
              <motion.div
                className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 flex flex-col gap-3"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
              >
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className="w-8 h-8 rounded-full shadow-inner cursor-pointer hover:ring-2 hover:ring-white/50"
                        style={{
                          backgroundColor: selectedColor ? 
                            `rgb(${selectedColor[0]},${selectedColor[1]},${selectedColor[2]})` : 
                            '#666'
                        }}
                        onMouseDown={() => setShowColorPicker(!showColorPicker)}
                      />
                      {selectedColor && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedColor(null);
                            setShowColorPicker(false);
                            setThreshold(DEFAULT_THRESHOLD);
                          }}
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-2 w-2 text-red-300" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                      )}
                    </div>
                    <label className="text-gray-300 text-sm font-medium">
                      {selectedColor ? 'Selected Color' : 'Choose Color'}
                    </label>
                  </div>
                  <motion.button
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => {
                      setShowControls(false);
                      setShowColorPicker(false);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </motion.button>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Match Threshold: {threshold}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="250"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="pt-3 border-t border-gray-700">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    View Mode
                  </label>
                  <div className="flex gap-2">
                    {Object.values(ViewMode).map(mode => (
                      <button
                        key={mode}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors
                          ${viewMode === mode 
                            ? 'bg-white/20 text-white' 
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                          }`}
                        onClick={() => setViewMode(mode)}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.button
                className="self-end backdrop-blur-sm p-2 rounded-full shadow-lg hover:opacity-80 transition-opacity"
                onClick={() => setShowControls(true)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                  backgroundColor: selectedColor 
                    ? `rgba(${selectedColor[0]},${selectedColor[1]},${selectedColor[2]}, 0.9)`
                    : 'rgba(31, 41, 55, 0.9)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Update color picker position
  const renderColorPicker = () => (
    <motion.div
      className="fixed bottom-[350px] right-8 z-40 w-[250px]" // Set fixed width
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="relative">
        <button
          className="absolute -top-2 -right-2 w-6 h-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center z-50 transition-colors"
          onClick={() => setShowColorPicker(false)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg overflow-hidden">
          <SketchPicker
            color={selectedColor ? {
              r: selectedColor[0],
              g: selectedColor[1],
              b: selectedColor[2],
            } : undefined}
            onChange={handleColorChange}
            styles={pickerStyles}
            presetColors={[]}
          />
        </div>
      </div>
    </motion.div>
  );

  const renderGallery = () => {
    const backgroundStyle = selectedColor ? {
      backgroundColor: `rgba(${selectedColor[0]}, ${selectedColor[1]}, ${selectedColor[2]}, 0.3)`,
    } : undefined;

    // Get filtered images first
    const filteredImages = sortedImages.filter(info => {
      if (!selectedColor) return true;
      const colorScore = getColorScore(info, selectedColor);
      return colorScore < threshold;
    });

    // Convert ColorEntry images to PhotoGrid format here, after filtering
    const photoGridImages = filteredImages.map(info => ({
      src: info.file_path,
      alt: "Kerala Image"
    }));

    const hasNoResults = selectedColor && filteredImages.length === 0;

    if (hasNoResults) {
      return <NoResults />;
    }

    switch (viewMode) {
      case ViewMode.FLOW:
        return (
          <div 
            className="h-[100vh] overflow-hidden -ml-16"
            style={backgroundStyle}
          >
            <div className="absolute inset-0 h-screen z-10" />
            <div className="w-full h-full">
              {!hasNoResults ? (
                <AnimatePresence>
                  {filteredImages.map((info, idx) => {
                    const colorScore = selectedColor ? getColorScore(info, selectedColor) : Infinity;
                    const isMatch = selectedColor && colorScore < threshold;
                    
                    if (selectedColor && !isMatch) return null;

                    const { x, y, scale } = getFlowPosition(
                      idx, 
                      sortedImages.length, 
                      colorScore,
                      viewport.width,
                      viewport.height
                    );
                    
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          x,
                          y,
                          scale: scale * 1.2,
                          rotate: Math.sin(idx) * 15,
                          filter: selectedColor ? 'grayscale(0%)' : 'grayscale(100%)'
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 50,
                          damping: 20,
                          mass: 1
                        }}
                        className="absolute w-28 h-28 -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:z-20"
                        onClick={() => setSelectedImage(info.file_path)}
                      >
                        <Image
                          src={info.file_path}
                          alt=""
                          className="w-full h-full object-cover rounded-lg hover:scale-125 transition-all duration-300"
                          width={150}
                          height={150}
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              ) : (
                <NoResults />
              )}
            </div>
          </div>
        );

      case ViewMode.MASONRY:
      case ViewMode.GRID:
        return (
          <div className="p-8" style={backgroundStyle}>
            <PhotoGrid
              images={photoGridImages}
              type={viewMode === ViewMode.MASONRY ? 'M' : 'S'}
              enableFullScreen={true}
              showLayoutToggle={false}
              className={selectedColor ? '' : 'grayscale'}
            />
          </div>
        );
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Hero
        images={["/photos/colors-of-kerala/cover.jpg"]}
        title="Colors of Kerala"
        description="Experience the vibrant palette of Kerala through a collection of images that showcase the rich and diverse colors that define this beautiful region."
        author='Soyuj Jung Basnet'
      />

      {/* Remove the original <section> and replace with Hero above */}
      <div className='w-full' id="colors">
        {/* Floating controls */}
        {renderControls()}

        <AnimatePresence>
          {showColorPicker && renderColorPicker()}
        </AnimatePresence>

        {renderGallery()}

        <AnimatePresence>
          {selectedImage && (
            <FullScreenImage
              src={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}
        </AnimatePresence>      </div>    </div>  );}