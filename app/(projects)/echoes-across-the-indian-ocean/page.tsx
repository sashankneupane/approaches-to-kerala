import React from 'react';
// import Image from 'next/image';

const EchoesAcrossTheIndianOcean: React.FC = () => {
    return (
        <div className="min-h-screen w-full scroll-hidden mb-8">
      {/* Header Section */}
      <header className="relative w-full h-screen">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(/projects/echoes-across-the-indian-ocean/cover.jpg)` }}
        >
          <div className="h-full w-full bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Echoes Across the Indian Ocean
            </h1>
            <p className="text-lg w-4/5 mx-auto md:text-xl text-gray-300 text-left">
            This project explores the historical and cultural ties between the 
            Gulf countries and India, with a focus on Kerala’s longstanding relationship with the Arabian Peninsula. These connections were first established through the spice trade, which brought Arab traders to Kerala and facilitated centuries of exchange in goods, culture, and traditions. I have chosen to explore this through a collection of videos taken in Kerala, with each clip from Kerala followed by a corresponding shot from the UAE. I used the background sounds from both locations along with interviews to give context to the visuals.
            </p>
            <div className="mt-12 animate-bounce">
              <span className="text-white text-2xl">↓ Scroll to explore</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto mt-16 px-2">
      </main>
    </div>
    );
};

export default EchoesAcrossTheIndianOcean;