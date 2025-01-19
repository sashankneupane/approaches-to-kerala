'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { SketchPicker, ColorResult } from 'react-color';
import { motion, AnimatePresence } from 'framer-motion';

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
      borderRadius: '0.5rem',
      width: '280px !important', // Reduced from 320px to 280px
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

// Update the TutorialPopup component to handle different types
const TutorialPopup = ({ type, onClose }: { type: 'color' | 'threshold'; onClose: () => void }) => {
  const content = {
    color: {
      title: "Choose Your Color!",
      description: "Click the colored circle next to 'Selected Color' to pick a color and see matching images.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      )
    },
    threshold: {
      title: "Adjust Match Threshold",
      description: "Use the slider under 'Match Threshold' to control how closely images match your selected color.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      )
    }
  };

  // Ensure we have valid content for the current type
  const currentContent = content[type];
  if (!currentContent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed ${
        type === 'color' 
          ? 'bottom-[280px] right-[200px]' 
          : 'bottom-[240px] right-[200px]'
      } z-50 bg-white/10 backdrop-blur-md rounded-lg p-6 text-white max-w-xs`}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white/20 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {currentContent.icon}
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">{currentContent.title}</h3>
          <p className="text-white/80 text-sm">
            {currentContent.description}
          </p>
        </div>
      </div>
      <motion.div
        className={`absolute ${
          type === 'color' 
            ? '-bottom-4 -right-4' 
            : '-bottom-4 -right-4'
        } w-12 h-12 rotate-45`}
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
      <button
        className="absolute top-2 right-2 text-white hover:bg-white/10 rounded-full p-1"
        onClick={onClose}
      >
        Close
      </button>
    </motion.div>
  );
};

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

interface ImageSize {
  height: string;
  orientation: 'vertical' | 'horizontal';
}

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
  const [viewMode, setViewMode] = useState<ViewModeType>(ViewMode.MASONRY);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const scrollTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [currentTutorial, setCurrentTutorial] = useState<'color' | 'threshold' | null>(null);
  const DEFAULT_THRESHOLD = 150;
  const [shownTutorials, setShownTutorials] = useState<Set<string>>(new Set());
  
  // Fetch colorInfo.json from public directory
  useEffect(() => {
    fetch('/projects/colors-of-kerala/colorInfo.json')
      .then((response) => response.json())
      .then((data: ColorEntry[]) => {
        setShuffledImages(shuffleArray(data));
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    // Show the tutorial on load
    setCurrentTutorial('color');
  }, []);

  useEffect(() => {
    // Show color tutorial first
    if (!shownTutorials.has('color')) {
      setCurrentTutorial('color');
    }
  }, [shownTutorials]);

  useEffect(() => {
    // Show threshold tutorial after color tutorial closes
    if (currentTutorial === null && selectedColor && !shownTutorials.has('threshold')) {
      const timer = setTimeout(() => {
        setCurrentTutorial('threshold');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentTutorial, selectedColor, shownTutorials]);

  const handleCloseTutorial = () => {
    if (currentTutorial) {
      setShownTutorials(prev => new Set([...prev, currentTutorial]));
    }
    setCurrentTutorial(null);
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
  };

  // As user picks color in SketchPicker, store it
  const handleColorChange = (color: ColorResult) => {
    setSelectedColor([color.rgb.r, color.rgb.g, color.rgb.b]);
    if (currentTutorial === 'color') {
      handleCloseTutorial();
    }
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

  const getImageSize = (index: number): ImageSize => {
    // Create varying sizes with orientations
    const patterns: ImageSize[] = [
      { height: 'h-64', orientation: 'horizontal' },  // medium horizontal
      { height: 'h-96', orientation: 'vertical' },    // tall vertical
      { height: 'h-48', orientation: 'horizontal' },  // small horizontal
      { height: 'h-80', orientation: 'vertical' },    // medium vertical
      { height: 'h-72', orientation: 'horizontal' },  // large horizontal
      { height: 'h-108', orientation: 'vertical' },   // extra tall vertical
    ];
    return patterns[index % patterns.length];
  };

  const renderControls = () => (
    <motion.div
      className="fixed bottom-8 right-8 z-40 flex flex-col gap-4"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
    >
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-700">
          <div
            className="w-8 h-8 rounded-full shadow-inner cursor-pointer hover:ring-2 hover:ring-white/50"
            style={{
              backgroundColor: selectedColor ? 
                `rgb(${selectedColor[0]},${selectedColor[1]},${selectedColor[2]})` : 
                '#666'
            }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          />
          <label className="text-gray-300 text-sm font-medium">
            {selectedColor ? 'Selected Color' : 'Choose Color'}
          </label>
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
            onChange={(e) => {
              setThreshold(Number(e.target.value));
              if (currentTutorial === 'threshold') {
                handleCloseTutorial();
              }
            }}
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

        {selectedColor && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-2 w-full py-2 px-4 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors text-sm font-medium border border-red-500/20"
            onClick={() => {
              setSelectedColor(null);
              setShowColorPicker(false);
              setThreshold(DEFAULT_THRESHOLD);
            }}
          >
            Reset All
          </motion.button>
        )}
      </div>
    </motion.div>
  );

  // Update color picker position
  const renderColorPicker = () => (
    <motion.div
      className="fixed bottom-[320px] right-8 z-40 scale-75 origin-bottom-right"
      initial={{ opacity: 0, scale: 0.8, y: 50 }} // Changed x to y for vertical animation
      animate={{ opacity: 1, scale: 0.75, y: 0 }} // Updated scale in animation
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
    >
      <SketchPicker
        color={selectedColor ? {
          r: selectedColor[0],
          g: selectedColor[1],
          b: selectedColor[2],
        } : undefined}
        onChange={handleColorChange}  // Switched from onChangeComplete
        styles={pickerStyles}
      />
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

    const hasNoResults = selectedColor && filteredImages.length === 0;

    switch (viewMode) {
      case ViewMode.FLOW:
        return (
          <div 
            className="relative h-[100vh] overflow-hidden bg-gradient-to-br from-gray-900 to-black p-20"
            style={backgroundStyle}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-10" />
            <div className="relative w-full h-full">
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
        const Container = viewMode === ViewMode.MASONRY 
          ? "columns-2 md:columns-3 lg:columns-4 gap-4"
          : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";

        return (
          <div 
            className={`relative min-h-[80vh] p-8 rounded-lg ${!hasNoResults ? Container : ''}`}
            style={backgroundStyle}
          >
            {!hasNoResults ? (
              <AnimatePresence>
                {filteredImages.map((info, idx) => {
                  const colorScore = selectedColor ? getColorScore(info, selectedColor) : Infinity;
                  const isMatch = selectedColor && colorScore < threshold;
                  const imageSize = viewMode === ViewMode.MASONRY ? getImageSize(idx) : null;
                  
                  if (selectedColor && !isMatch) return null;

                  return (
                    <motion.div
                      key={idx}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        filter: selectedColor ? 'grayscale(0%)' : 'grayscale(100%)'
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className={`${
                        viewMode === ViewMode.MASONRY
                          ? `mb-4 break-inside-avoid cursor-pointer ${imageSize?.height}`
                          : 'aspect-square'
                      } cursor-pointer relative overflow-hidden rounded-lg`}
                      onClick={() => setSelectedImage(info.file_path)}
                    >
                      <Image
                        src={info.file_path}
                        alt=""
                        className={`w-full h-full object-cover hover:scale-105 transition-transform ${
                          imageSize?.orientation === 'vertical' ? 'object-[center_20%]' : ''
                        }`}
                        width={400}
                        height={400}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            ) : (
              <NoResults />
            )}
          </div>
        );
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/projects/colors-of-kerala/IMG_3819.JPG')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          <motion.div
            className="text-center text-white p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
                    <div className="relative text-center text-white px-6">

          <h1 className="text-[100px] font-bold mb-4" style={{ fontFamily: 'Impact' }}>Colors of Kerala</h1>
          
          <p className="w-4/5 mx-auto text-xl font-light text-white mb-8">
            Experience the vibrant palette of Kerala through a collection of images that showcase the rich and diverse colors that define this beautiful region.
          </p>
          <a
            href="#colors"
            className="mt-8 inline-block text-white border-2 border-white hover:bg-white hover:text-black font-bold py-3 px-6 transition-all"
          >
            Explore
          </a>
        </div>
        <div className="mt-4 w-20 h-1 bg-white mx-auto rounded"></div>
        </motion.div>
      </section>

      <div className="p-8" id="colors">
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
        </AnimatePresence>

        <AnimatePresence>
          {currentTutorial && (
            <TutorialPopup
              type={currentTutorial}
              onClose={handleCloseTutorial}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}