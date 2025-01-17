"use client";
import { useState } from 'react';
import Image from 'next/image';
import performances from './data.json';

interface Performance {
  name: string;
  type: string;
  videoUrl: string;
  thumbnail: string;
  description: string;
}

const types = ["All", "Traditional", "Martial Art", "Folk Dance"];

export default function KeralaPerformances() {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedVideo, setSelectedVideo] = useState<Performance | null>(null);

  const filteredPerformances =
    selectedType === "All"
      ? performances
      : performances.filter((performance: Performance) => performance.type === selectedType);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <header className="relative w-full">
        <div className="h-64 w-full bg-cover bg-center" style={{ backgroundImage: `url(/projects/360/cover.jpg)` }}>
          <div className="h-full w-full bg-black bg-opacity-50 flex justify-center items-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white">Kerala&apos;s Performative Traditions</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-6 space-x-4">
          {types.map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md ${
                selectedType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {selectedVideo ? (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
            <div className="relative w-full h-full">
              <iframe
                src={`${selectedVideo.videoUrl}&rel=0&controls=0&modestbranding=1&showinfo=0`}
                title={selectedVideo.name}
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPerformances.map((performance: Performance) => (
              <div
                key={performance.name}
                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setSelectedVideo(performance)}
              >
                <Image
                  src={performance.thumbnail}
                  alt={performance.name}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">{performance.name}</h2>
                  <p className="text-sm text-gray-600">{performance.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}