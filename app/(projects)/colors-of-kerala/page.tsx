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
function getColorScore(info: ColorEntry, targetColor: [number, number, number]) {
  // Dominant color gets higher weight (0.6)
  const dominantDist = colorDistance(info.dominant_color, targetColor) * 0.7;
  
  // Find closest palette color (0.4 weight)
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
      width: '320px !important', // Force wider width
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

export default function ColorsOfKeralaPage() {
  const [selectedColor, setSelectedColor] = useState<[number, number, number]>([255, 0, 0]);
  const [shuffledImages, setShuffledImages] = useState<ColorEntry[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [threshold, setThreshold] = useState(150); // Move threshold to state

  // Fetch colorInfo.json from public directory
  useEffect(() => {
    fetch('/projects/colors-of-kerala/colorInfo.json')
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

  // For each image, check if it's within threshold of selected color
  // You could also compare all palette colors for a better match
  const sortedImages = useMemo(() => {
    return [...shuffledImages].sort((a, b) => {
      const scoreA = getColorScore(a, selectedColor);
      const scoreB = getColorScore(b, selectedColor);
      return scoreA - scoreB;
    });
  }, [shuffledImages, selectedColor]);

  return (
    <div className="w-full">
      {/* Cover Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <div className="w-full h-full"></div>
        </div>
        <motion.div
          className="text-center text-white p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-wider mb-6">
            Colors of Kerala
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Experience the vibrant palette of Kerala through a collection of images that showcase the rich and diverse colors that define this beautiful region.
          </p>
          <div className="mt-4 w-20 h-1 bg-white mx-auto rounded"></div>
        </motion.div>
      </section>

      {/* Color Picker and Gallery Section */}
      <div className="p-8">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-start mb-6">
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <SketchPicker
              color={{
                r: selectedColor[0],
                g: selectedColor[1],
                b: selectedColor[2],
              }}
              onChangeComplete={handleColorChange}
              styles={pickerStyles}
            />
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-2xl min-w-[250px]">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Color Match Threshold: {threshold}
            </label>
            <input
              type="range"
              min="50"
              max="250"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Strict</span>
              <span>Loose</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sortedImages.map((info, idx) => {
            const dist = getColorScore(info, selectedColor);
            const isMatch = dist < threshold;
            return (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  filter: isMatch ? 'grayscale(0%)' : 'grayscale(100%)'
                }}
                transition={{
                  opacity: { duration: 0.5 },
                  filter: { duration: 0.3 },
                  layout: { duration: 0.3 }
                }}
                className="aspect-square relative overflow-hidden cursor-pointer bg-gray-800"
                onClick={() => setSelectedImage(info.file_path)}
              >
                <Image
                  src={info.file_path}  
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  width={300}
                  height={300}
                />
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <FullScreenImage
              src={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}