'use client';
import React from 'react';
import Hero from '@/components/hero';
import { motion } from 'framer-motion';

const Keralatography = () => {
  return (
    <div className="min-h-screen w-full">
      <Hero
        images={['/photos/covers/shahad.jpg']}
        title="Keralatography"
        description="A Visual Journey Through Kerala"
        imageInterval={5000}
      />

      <div className="w-full px-4 py-24">
        {/* Video Section */}
        <motion.div 
          className="w-3/4 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/WOKSwHNbjNw?rel=0&branding=0&showinfo=0&autohide=1&modestbranding=1&loop=1"
              title="Keralatography"
              allow="accelerometer; autoplay; autoloop; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-8">
            <p className="text-gray-400 text-center italic text-lg">
              &quot;Experience Kerala through a cinematic lens&quot;
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Keralatography;
