"use client";

import { useState } from "react";
import Image from "next/image";
import performances from "./data.json";

interface Performance {
  name: string;
  type: string;
  videoUrl: string;
  thumbnail: string;
  description: string;
}

const types = ["All", "Performance", "Place", "Street"];

export default function Page() {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedVideo, setSelectedVideo] = useState<Performance | null>(null);

  const filteredPerformances =
    selectedType === "All"
      ? performances
      : performances.filter((performance: Performance) => performance.type === selectedType);

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
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
      <main className="container mx-auto mt-16">
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

        {/* Video Player */}
        {selectedVideo ? (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
            <div className="relative w-full h-full">
              <iframe
                src={`${selectedVideo.videoUrl}?rel=0&modestbranding=1&autoplay=1&controls=0&showinfo=0&disablekb=1&fs=0`}
                title={selectedVideo.name}
                className="w-full h-full border-none"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
              <button
                className="absolute top-4 right-4 text-white text-3xl focus:outline-none"
                onClick={() => setSelectedVideo(null)}
              >
                &times;
              </button>
            </div>
          </div>
        ) : (
          <div
            className="grid gap-2 my-8"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {filteredPerformances.map((performance: Performance) => (
                <div
                key={performance.name}
                className="relative bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setSelectedVideo(performance)}
                >
                <Image
                  src={performance.thumbnail}
                  alt={performance.name}
                  width={500}
                  height={500}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 hover:opacity-100 transition-opacity p-4 flex flex-col justify-center">
                  <h2 className="text-md font-semibold text-white mb-1">
                  {performance.name}
                  </h2>
                  <p className="text-xs text-gray-300 mb-1">{performance.type}</p>
                  <p className="text-xs text-gray-300">{performance.description}</p>
                </div>
                </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
