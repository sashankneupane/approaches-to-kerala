'use client';
import React, { useState, useEffect } from 'react';
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
        ? 'bg-white/20 text-white' 
        : 'text-white/60 hover:text-white hover:bg-white/10'
    }`}
  >
    {type.charAt(0).toUpperCase() + type.slice(1)}
  </button>
);

const ThreeDViewer = ({ src, size }: { src: string; size: string }) => {
  const [modelViewerLoaded, setModelViewerLoaded] = useState(false);
  const [, setIsHovering] = useState(false);

  console.log('src', src);
  console.log('size', size);

  useEffect(() => {
    if (!customElements.get('model-viewer')) {
      import('@google/model-viewer')
        .then(() => setModelViewerLoaded(true))
        .catch(console.error);
    } else {
      setModelViewerLoaded(true);
    }
  }, []);

  if (!modelViewerLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-white/60">Loading 3D viewer...</p>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-full rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
        <div className="w-full h-full flex items-center justify-center">
            <p className="text-white/30 text-md font-medium">3D Models coming soon...</p>
        </div>
      {/* <model-viewer
        src={src}
        alt={`${size} Nilavilakku 3D Model`}
        camera-controls
        auto-rotate
        rotation-per-second="30deg"
        auto-rotate-delay={0}
        orbit-sensitivity={1}
        min-camera-orbit="auto auto 100%"
        max-camera-orbit="auto auto 250%"
        camera-orbit="0deg 60deg 220%"
        field-of-view="45deg"
        interaction-prompt="none"
        touch-action="pan-y"
        disable-zoom={false}
        disable-tap={false}
        enable-pan={true}
        shadow-intensity="1"
        environment-image="neutral"
        exposure="1"
        class="rounded-xl"
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
      ></model-viewer> */}
    <motion.div 
      className="absolute bottom-4 left-0 right-0 pointer-events-none flex justify-center"
      transition={{ duration: 0.2 }}
    >
      <p className="text-white/40 text-xs font-light tracking-wide">
        ↻ Rotate by dragging • ⇧ Zoom with scroll • ⇔ Pan with right-click
      </p>
    </motion.div>
    </div>
  );
};

export default function ModelViewer({ className = "" }: ModelViewerProps) {
  const [selectedSize, setSelectedSize] = useState<ModelSize>('50cm');
  const [viewType, setViewType] = useState<ViewType>('real');

  const getModelSource = () => {
    const baseUrl = `/photos/lights-of-kerala/${selectedSize}`;
    return {
      model: `${baseUrl}/${selectedSize}.gltf`,
      image: `${baseUrl}/${viewType}.png`
    };
  };

  const getImageSizeClass = (type: ViewType) => {
    switch (type) {
      case 'front':
      case 'isometric':
        return 'scale-75';
      default:
        return 'scale-100';
    }
  };

  const sources = getModelSource();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controls Container */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 px-4">
        {/* View Type Selector */}
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-1 flex gap-2">
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

      {/* Split View Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:flex md:flex-row-reverse">
        {/* 3D Model View - Right Side */}
        <div className="h-[600px] md:flex-1 bg-transparent rounded-xl overflow-hidden relative order-last md:order-none">
          <ThreeDViewer src={sources.model} size={selectedSize} />
        </div>

        {/* 2D View - Left Side */}
        <div className="h-[600px] md:flex-1 bg-transparent rounded-xl overflow-hidden relative">
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
                src={sources.image}
                alt={`${selectedSize} Nilavilakku ${viewType} view`}
                fill
                className={`object-contain rounded-xl transition-transform duration-300 ${getImageSizeClass(viewType)}`}
                style={{ backgroundColor: 'transparent' }}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p className="text-white/40 text-xs font-light tracking-wide">
              {viewType.charAt(0).toUpperCase() + viewType.slice(1)} view
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}