'use client';
import React from "react";

export default function Keralatography() {
  return (
    <div className="bg-gradient-to-b from-white-900 via-black to-gray-900 text-white min-h-screen flex flex-col items-center py-12 px-4">
      {/* Title Section */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-wide text-center" style={{ fontFamily: 'Impact' }}>
        Keralatography
      </h1>
      <div className="mt-4 w-24 h-1 bg-white mx-auto rounded mb-8"></div>

      {/* Video Section */}
      <div className="w-full max-w-4xl">
        <video
          className="w-full h-auto rounded-lg shadow-lg focus:outline-none"
          controls
          muted
          loop
        >
          <source src="/projects/keralatography/keralatography.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
