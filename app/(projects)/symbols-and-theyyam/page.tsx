'use client';
import React, { useState, useRef } from "react";
import Image from "next/image";

export default function SymbolsAndTheyyam() {
  const projectDirectory = "/projects/symbols-and-theyyam";
  const [videoIndex, setVideoIndex] = useState(0);
  const theyyamVideos = [
    "https://www.youtube.com/embed/lROnAXKDUko",
    "https://www.youtube.com/embed/dVFR84Gvhk0"
  ];
  const lynchMemory = "https://www.youtube.com/embed/J1Ylguq1GLc";

  const photos = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black">
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative text-center text-white px-6">
          <h1 className="text-[100px] font-bold mb-4" style={{ fontFamily: 'Impact' }}>Symbols and Theyyam</h1>
          <a
            href="#theyyam"
            className="mt-8 inline-block text-white border-2 border-white hover:bg-white hover:text-black font-bold py-3 px-6 transition-all"
          >
            Explore
          </a>
        </div>
      </section>

      {/* Section 1 (Horizontal scroll with memo notes) */}
      <section className="relative py-8 bg-black" id="theyyam">
        <div className="relative text-white px-6">
          {/* Scroll Buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 z-10 bg-zinc-800 text-white p-4 rounded-full opacity-75 hover:opacity-100 transition-opacity"
          >
            ←
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 z-10 bg-zinc-800 text-white p-4 rounded-full opacity-75 hover:opacity-100 transition-opacity"
          >
            →
          </button>
          
          <div ref={scrollContainerRef} className="flex gap-8 overflow-x-scroll scroll-smooth scrollbar-hide">
            {/* Left Memo */}
            <div className="min-w-[800px] bg-zinc-900 p-8 rounded-lg shadow-2xl border border-zinc-800 h-[600px] flex items-center">
              <p className="text-2xl font-light">
                On the way, my eyes come across several hammer and sickle flags. I think of the red and I think of Theyyam. I think of Theyyam and I think of the red. It was the will of the people to choose the red, and it is the deities that embody a vivid red. I feel there&apos;s much to ponder here, (…).
              </p>
            </div>
            {/* Images */}
            {photos.map((img, i) => (
              <div key={i} className="min-w-[800px] h-[600px] bg-zinc-900 rounded-lg overflow-hidden shadow-2xl">
                <Image src={`${projectDirectory}/${img}`} width={800} height={600} alt={"Image " + i} className="object-cover w-full h-full" />
              </div>
            ))}
            {/* Right Memo */}
            <div className="min-w-[800px] bg-zinc-900 p-8 rounded-lg shadow-2xl border border-zinc-800 h-[600px] flex items-center">
              <p className="text-2xl font-light">
                Theyyam, with its origins in lower caste communities, has historically served as a form of resistance against upper caste dominance. Moreover, the performative aspect of Theyyam, where lower caste individuals temporarily embody deities and receive reverence from upper castes, represents a reversal of traditional hierarchies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 (PDF + YouTube switcher) */}
      <section className="py-8 bg-black">
        <div className="text-white px-6 flex gap-8 w-full justify-center items-start max-w-[2000px] mx-auto">
          <div className="flex-1 bg-zinc-900 p-4 rounded-lg shadow-2xl">
            <iframe
              src={`${projectDirectory}/drums thrummed.pdf#toolbar=0`}
              style={{ width: '100%', height: '800px' }}
              className="rounded-lg"
            />
          </div>
          <div className="flex-1 bg-zinc-900 p-4 rounded-lg shadow-2xl">
            <iframe
              src={theyyamVideos[videoIndex]}
              style={{ width: '100%', height: '800px' }}
              title="Theyyam"
              className="rounded-lg"
            />
            <button
              onClick={() => setVideoIndex((videoIndex + 1) % 2)}
              className="mt-6 inline-block text-white border-2 border-white hover:bg-white hover:text-black font-bold py-3 px-6 transition-all"
            >
              {`Theyyam - ${videoIndex === 0 ? "Fast" : "Slow"} Rhythm`}
            </button>
          </div>
        </div>
      </section>

      {/* Section 3 (PDF + single YouTube) */}
      <section className="py-8 bg-black">
        <div className="text-white px-6 flex gap-8 w-full justify-center items-start max-w-[2000px] mx-auto">
          <div className="flex-1 bg-zinc-900 p-4 rounded-lg shadow-2xl">
            <iframe
              src={`${projectDirectory}/metal and flesh.pdf#toolbar=0`}
              style={{ width: '100%', height: '800px' }}
              className="rounded-lg"
            />
          </div>
          <div className="flex-1 bg-zinc-900 p-4 rounded-lg shadow-2xl">
            <iframe
              src={lynchMemory}
              style={{ width: '100%', height: '800px' }}
              title="Lynch Memory"
              className="rounded-lg"
            />
            <div className="mt-6 text-sm text-white">
              In memory of David Lynch.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}