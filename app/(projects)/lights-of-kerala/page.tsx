'use client';
import React from 'react';
import Hero from '@/components/hero';
import PhotoGrid from '@/components/photogrid';
import lamps from './data.json';
import { motion } from 'framer-motion';

export default function LightsOfKerala() {
  const gridImages = lamps.map(lamp => ({
    src: lamp.src,
    alt: lamp.alt,
    description: lamp.description,
    width: 800,
    height: 800
  }));

  return (
    <div className="min-h-screen w-full bg-black">
      <Hero 
        images={['/projects/lights-of-kerala/cover.png']}
        title="Lights of Kerala"
        description="A symbol of purity, divine presence and dispelling darkness"
        imageInterval={5000}
      />

      <main className="max-w-[2000px] mx-auto px-4 py-24">
        <motion.div 
          className="max-w-3xl mx-auto mb-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl text-white/90 font-light mb-6">Nilavilakku</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Traditional lamps, known as 'Nilavilakku', have been an integral part of 
            Kerala's cultural and spiritual heritage. This collection showcases various 
            forms of these sacred illuminations found across different locations in Kerala.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <PhotoGrid 
            images={gridImages}
            enableFullScreen={true}
            defaultLayout="masonry"
            className="px-4"
          />
        </motion.div>
      </main>
    </div>
  );
}