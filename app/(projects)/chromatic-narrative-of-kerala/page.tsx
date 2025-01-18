'use client';
import React from "react";
import Hero from "@/components/hero";
import PhotoGrid from "@/components/photogrid";

export default function Home() {
  const images = [
    {
      src: "/projects/chromatic-narrative-of-kerala/red.jpg",
      title: "Red and Gold in Hindu Temples",
      description: "Red is often associated with Shakti, symbolizing power and passion. Gold represents prosperity and divinity, found in temple sanctums and deity adornments.",
    },
    {
      src: "/projects/chromatic-narrative-of-kerala/theyyam.jpg",
      title: "Vibrant Colors in Theyyam",
      description: "Red represents Bhadrakali and power, while yellow/gold signifies Vishnu, purity and knowledge in these ritualistic performances.",
    },
    {
      src: "/projects/chromatic-narrative-of-kerala/blue1.jpg",
      title: "Blue in Maritime Contexts",
      description: "Blue represents the ocean's vastness and maritime traditions, symbolizing calmness and faith for seafarers.",
    },
    {
      src: "/projects/chromatic-narrative-of-kerala/green1.jpg",
      title: "Green in Islamic Religion",
      description: "Green, sacred in Islam, represents paradise and tranquility, deeply connected to Kerala's Muslim identity.",
    },
  ];

  return (
    <main className="min-h-screen bg-black">
      <Hero 
        images={["/projects/chromatic-narrative-of-kerala/cover.png"]}
        title="Chromatic Narrative of Kerala"
        description="Exploring the Semiotics of Color in “God’s Own Country”"
      />

      {/* Project Description */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg leading-relaxed">
            This project delves into the significant role of color in shaping the cultural landscape of Kerala, India. 
            Drawing upon ethnographic observations, interviews, and visual analysis, this project investigates how 
            colors are semiotically employed across various domains, including architecture, dress, religion, and 
            rituals in Kerala.
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4"> {/* updated max-width for masonry */}
          <PhotoGrid 
            images={images}
            type="B"
            showLayoutToggle={false}
            showTitle={true}
            className="mb-8"
          />
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-500">More Color Symbolism</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-zinc-800 p-6 rounded-lg bg-black text-white">
          <h3 className="text-xl font-bold mb-4">Black in Kerala</h3>
          <p className="text-gray-300">
            Black is generally associated with negativity, sadness, and mourning. It is not typically worn during 
            festive occasions and is often avoided in everyday wear; during funerals, it's not necessarily the 
            'dress code', but a black flag would be raised.
          </p>
        </div>
        <div className="border border-zinc-800 p-6 rounded-lg bg-white text-black">
          <h3 className="text-xl font-bold mb-4">White in Kerala</h3>
          <p className="text-gray-700">
            White is traditionally associated with purity, simplicity, and peace. It is often worn during 
            auspicious occasions and is considered to be a color of 'preciousness'.
          </p>
        </div>
          </div>
        </div>
      </section>
    </main>
  );
}
