'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type ModelSize = '50cm' | '150cm';
type ViewType = 'real' | 'front' | 'isometric' | 'drawing';

interface ModelViewerProps {
  className?: string;
}

const ViewTypeButton = ({ type, active, onClick }: { 
  type: ViewType; 
  active: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      active 
        ? 'bg-white text-black' 
        : 'text-white/60 hover:text-white hover:bg-white/10'
    }`}
  >
    {type.charAt(0).toUpperCase() + type.slice(1)}
  </button>
);

export default function ModelViewer({ className = "" }: ModelViewerProps) {
  const [selectedSize, setSelectedSize] = useState<ModelSize>('50cm');
  const [viewType, setViewType] = useState<ViewType>('isometric');

  const getImageSource = () => {
    return `/photos/lights-of-kerala/models/${selectedSize}/${viewType}.png`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controls Container */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 px-4">
        {/* View Type Selector */}
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-1 flex gap-2 flex-wrap">
          {(['real', 'front', 'isometric', 'drawing'] as ViewType[]).map((type) => (
            <ViewTypeButton
              key={type}
              type={type}
              active={viewType === type}
              onClick={() => setViewType(type)}
            />
          ))}
        </div>

        {/* Size Selector */}
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-1 flex gap-2 sm:ml-auto">
          {['50cm', '150cm'].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size as ModelSize)}
              className={`w-24 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedSize === size 
                  ? 'bg-white text-black' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Image View Container */}
      <div className="h-[600px] bg-black/20 rounded-xl overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedSize}-${viewType}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full rounded-xl overflow-hidden"
          >
            <Image
              src={getImageSource()}
              alt={`${selectedSize} Nilavilakku ${viewType} view`}
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>
        <motion.div 
          className="absolute bottom-4 left-0 right-0 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-white/40 text-sm font-light tracking-wide">
            {selectedSize} Model - {viewType.charAt(0).toUpperCase() + viewType.slice(1)} View
          </p>
        </motion.div>
      </div>
    </div>
  );
}