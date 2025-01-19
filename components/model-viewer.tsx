'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '@google/model-viewer';

const ThreeDViewer = ({ src }: { src: string }) => {
  const [modelViewerLoaded, setModelViewerLoaded] = useState(false);

  console.log('src', src);

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
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {/* <model-viewer
        src={src}
        alt="3D Model"
        camera-controls
        auto-rotate
        rotation-per-second="30deg"
        orbit-sensitivity="1"
        auto-rotate-delay="0"
        touch-action="pan-y"
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
      >
      </model-viewer> */}

      {/* Overlay */}
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

export default ThreeDViewer;
