'use client';

import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { motion } from 'framer-motion';

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

export default function ColorsOfKeralaPage() {
  const [colorInfo, setColorInfo] = useState<ColorEntry[]>([]);
  const [selectedColor, setSelectedColor] = useState<[number, number, number]>([255, 0, 0]);
  const [shuffledImages, setShuffledImages] = useState<ColorEntry[]>([]);

  // Fetch or import colorInfo.json (client-side example)
  useEffect(() => {
    // In a real app, fetch from an API route or read from public
    import('./colorInfo.json')
      .then((data) => {
        const info = data.default as ColorEntry[];
        setColorInfo(info);
        setShuffledImages(shuffleArray(info));
      })
      .catch((err) => console.error(err));
  }, []);

  // As user picks color in SketchPicker, store it
  const handleColorChange = (color: any) => {
    setSelectedColor([color.rgb.r, color.rgb.g, color.rgb.b]);
  };

  // Filter threshold
  const threshold = 100; // Adjust as needed

  // For each image, check if it's within threshold of selected color
  // You could also compare all palette colors for a better match
  const sortedImages = [...shuffledImages].sort((a, b) => {
    const distA = colorDistance(a.dominant_color, selectedColor);
    const distB = colorDistance(b.dominant_color, selectedColor);
    return distA - distB;
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mt-2 mb-6">Colors of Kerala</h1>
      <div className="mb-6">
        <SketchPicker
          color={{
            r: selectedColor[0],
            g: selectedColor[1],
            b: selectedColor[2],
          }}
          onChange={handleColorChange}
        />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sortedImages.map((info, idx) => {
          const dist = colorDistance(info.dominant_color, selectedColor);
          const isMatch = dist < threshold;
          return (
            <motion.div
              key={idx}
              layout
              className="overflow-hidden"
              style={{
                filter: isMatch ? 'none' : 'grayscale(100%)',
              }}
            >
              <img
                src={info.file_path}  // Now the path will be like "/projects/colors-of-kerala/image.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}