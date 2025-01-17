"use client";

import React, { useState, useMemo } from "react";
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

const types = ["All", "Performance", "Place", "Street"];

const Page = () => {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedVideo, setSelectedVideo] = useState<Performance | null>(null);

  const filteredPerformances = useMemo(
    () =>
      selectedType === "All"
        ? performances
        : performances.filter((item) => item.type === selectedType),
    [selectedType]
  );

  return (
    <div className="min-h-screen w-full scroll-hidden mb-8">
      {/* Header Section */}
      <header className="relative w-full h-screen">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(/projects/kerala-in-360/cover.jpg)` }}
        >
          <div className="h-full w-full bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Kerala in 360
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Dive into the rich cultural tapestry of Kerala&apos;s art forms.
            </p>
            <div className="mt-12 animate-bounce">
              <span className="text-white text-2xl">↓ Scroll to explore</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto mt-16 px-2">
        {/* Filter Chips */}
        <div className="flex overflow-x-auto mb-8 space-x-4 scrollbar-hide">
          {types.map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full text-sm font-medium shadow-md whitespace-nowrap transition-all ${
                selectedType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPerformances.map((performance, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden cursor-pointer bg-gray-800 rounded-lg"
              onClick={() => setSelectedVideo(performance)}
            >
              <Image
                src={performance.thumbnail}
                alt={performance.name}
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm text-center px-2">
                  {performance.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

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
