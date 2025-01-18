'use client';
import React from "react";
import Hero from '@/components/hero';

export default function Keralatography() {
  return (
    <div className="bg-black min-h-screen">
      <Hero
        images={["/dp/shahad.jpg"]}
        title="Keralatography"
        description="A Visual Journey Through Kerala"
      />
      
      {/* Video Section */}
      <div className="w-4/5 mx-auto px-4 py-16">
        <video
          className="w-full h-auto rounded-lg shadow-lg focus:outline-none"
          controls
          muted
          loop
        >
          <source src="/projects/keralatography/keralatography.MOV" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
