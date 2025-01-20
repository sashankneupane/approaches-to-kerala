'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/hero';
import PhotoGrid from '@/components/photogrid';

export default function LucaAudioPage() {
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const baseUrl = "/photos/sounds-and-sights-of-everyday-kerala";
  const imagesUrl = `${baseUrl}/sights`;

  // for i in 1 to 24, padd lucaXX to the array
  const imagePaths = Array.from({ length: 24 }, (_, i) => `${imagesUrl}/luca${String(i + 1).padStart(2, '0')}.jpg`);
  const images = imagePaths.map((path) => ({ src: path, alt: "Luca", width: 800, height: 800 }));


  const audioFiles = useMemo(() => [
    { title: "Folk Song at Calicut", file: "calicut-girl-singing.mp4" },
    { title: "English Pop Cover", file: "english-pop-song-wav-v1.mp4" },
    { title: "Student's Folk Performance", file: "folkore-student-singing-wav-v1.mp4" },
    { title: "Girl's Traditional Song", file: "girl-singing-short.mp3" },
    { title: "Market Ambience & Song", file: "local-song-chaotic-background.mp3" },
    { title: "Male Folk Song", file: "male-folk-song-wav-v1.mp4" },
    { title: "Mappila Folk Song", file: "mappla-folk-song.mp4" },
    { title: "Street Performance", file: "song-by-a-guy-from-the-random-place.m4a" },
  ], []);

  const handleAudioPlay = useCallback((index: number) => {
    if (activeAudio) {
      activeAudio.pause();
    }
    const audio = new Audio(`/audios/sounds-and-sights-of-everyday-kerala/${audioFiles[index].file}`);
    audio.play();
    setActiveAudio(audio);
    setPlayingIndex(index);
  }, [activeAudio, audioFiles]);

  const stopAudio = useCallback(() => {
    if (activeAudio) {
      activeAudio.pause();
      setActiveAudio(null);
      setPlayingIndex(null);
    }
  }, [activeAudio]);


  return (
    <main className="min-h-screen w-full bg-black text-white">
      <Hero
        images={[`${baseUrl}/cover.jpg`]}
        title="Sounds & Sights of Everyday Kerala"
        description="An immersive journey through Kerala's daily rhythms and visual stories"
        author="Luka Salkovic"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Audio Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {audioFiles.map((audio, index) => (
            <motion.button
              key={index}
              className={`p-4 rounded-xl backdrop-blur-sm transition-all ${
                playingIndex === index 
                  ? 'bg-white/20 shadow-lg shadow-white/10' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
              onClick={() => playingIndex === index ? stopAudio() : handleAudioPlay(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  playingIndex === index ? 'bg-white text-black' : 'border border-white/50'
                }`}>
                  {playingIndex === index ? '■' : '▶'}
                </div>
                <span className="text-sm text-left">{audio.title}</span>
              </div>
              {playingIndex === index && (
                <motion.div 
                  className="mt-2 h-0.5 bg-white/30 rounded-full overflow-hidden"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 30, ease: "linear" }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Photo Grid */}
        <PhotoGrid 
          images={images}
          enableFullScreen={true}
          showLayoutToggle={true}
          type="M"
          className="transition-all duration-500"
        />
      </div>

      <style jsx global>{`
        @keyframes subtle-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        .animate-subtle-pulse {
          animation: subtle-pulse 4s infinite ease-in-out;
        }
      `}</style>
    </main>
  );
}