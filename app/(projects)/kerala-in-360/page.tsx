"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import performances from "./data.json";

interface Performance {
  name: string;
  type: string;
  videoUrl: string;
  thumbnail: string;
  description: string;
}

const Page = () => {
  const [selectedVideo, setSelectedVideo] = useState<Performance | null>(null);

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <div className="relative h-screen w-full">
        <Image
          src="/projects/kerala-in-360/cover.jpg"
          alt="Kerala in 360 Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Kerala in 360°
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 max-w-2xl"
          >
            Experience the vibrant culture and traditions of Kerala through immersive 360° videos
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-10 animate-bounce"
          >
            <span className="text-white/60 text-sm tracking-widest uppercase">Scroll to explore</span>
          </motion.div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {performances.map((performance, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative aspect-video cursor-pointer rounded-xl overflow-hidden"
              onClick={() => setSelectedVideo(performance)}
            >
              <Image
                src={performance.thumbnail}
                alt={performance.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <p className="text-white text-center font-medium">
                  {performance.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-5xl h-3/4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <iframe
                src={`${selectedVideo.videoUrl}?autoplay=1`}
                className="w-full h-full border-none rounded-lg"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={selectedVideo.name}
              ></iframe>
            </motion.div>
            <button
              className="absolute top-8 right-8 text-white text-4xl p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
