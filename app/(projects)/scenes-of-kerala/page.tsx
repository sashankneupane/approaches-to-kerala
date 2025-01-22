'use client';
import React, { useState, useCallback, useMemo } from 'react';
import Hero from '@/components/hero';
import AudioPlayer from '@/components/audioplayer';
import AudioVisualGallery from '@/components/audiovisualgallery';

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function NoorAudioPage() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Use useMemo to keep the shuffled order consistent across re-renders
  const images = useMemo(() => {
    const originalImages = Array.from({ length: 16 }, (_, i) => 
      `/photos/scenes-of-kerala/scenes/noor${(i + 1).toString().padStart(2, '0')}.jpg`
    );
    return shuffleArray(originalImages);
  }, []); // Empty dependency array means this will only run once on mount

  const handleAudioPlayStateChange = useCallback((playing: boolean) => {
    setIsAudioPlaying(playing);
  }, []);

  const handleAudioProgress = useCallback((progress: number) => {
    setAudioProgress(progress);
  }, []);

  return (
    <main className="min-h-screen w-full bg-black text-white">
      <Hero
        images={["/photos/scenes-of-kerala/cover.jpg"]}
        title="Scenes of Kerala"
        description="“An audio-visual journey through Kerala\’s cultural landscape that separates sound from image to find new correspondences"
        author='Noor Haddad'
      />

      <div className="relative">
        <div className="sticky top-4 z-10 w-4/5 mx-auto pt-12 pb-8">
          <AudioPlayer 
            src="/audios/scenes-of-kerala/audio.mp3"
            onPlayStateChange={handleAudioPlayStateChange}
            coverImage="/photos/scenes-of-kerala/cover.jpg"
            title="An audio-visual journey Through Kerala"
            onProgressChange={handleAudioProgress}
          />
        </div>

        <AudioVisualGallery
          isPlaying={isAudioPlaying}
          images={images}
          progress={audioProgress}
        />
      </div>
    </main>
  );
}
