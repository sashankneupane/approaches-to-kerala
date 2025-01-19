'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface AudioPlayerProps {
  src: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
  coverImage?: string;
  title?: string;
  onProgressChange?: (progress: number, currentTime: number) => void;
}

export default function AudioPlayer({ 
  src, 
  onPlayStateChange,
  coverImage = "/images/audio-wave.png",
  title = "Audio Narration",
  onProgressChange,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(156);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Ensure metadata is loaded
    audio.preload = "metadata";

    const updateProgress = () => {
      const currentTime = audio.currentTime;
      const progress = (currentTime / duration) * 100;
      setProgress(currentTime);
      onProgressChange?.(progress, currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    // Also listen for duration changes
    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onPlayStateChange, onProgressChange, duration]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      onPlayStateChange?.(!isPlaying);
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setProgress(0);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const formatTime = (time: number) => {
    if (!isFinite(time) || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleProgressUpdate(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleProgressUpdate(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleProgressUpdate = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = progressBarRef.current?.getBoundingClientRect();
    if (!bounds || !audioRef.current) return;

    const x = e.clientX - bounds.left;
    const percent = Math.min(Math.max(x / bounds.width, 0), 1);
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div 
        className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 shadow-2xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-6">
          {/* Cover Art / Visualizer */}
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <motion.div 
              className="absolute inset-0 rounded-xl overflow-hidden"
              animate={isPlaying ? {
                scale: [1, 1.02, 1],
                borderRadius: ["30%", "40%", "30%"]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image 
                src={coverImage} 
                alt="Audio visualizer"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent" />
            </motion.div>
          </div>

          {/* Controls and Progress */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-white/90 font-medium">{title}</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={resetAudio}
                  className="text-white/60 hover:text-white/90 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                  </svg>
                </button>
                <span className="text-xs text-white/60 font-mono">
                  {formatTime(progress)} / {formatTime(duration)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Play/Pause Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="relative group"
              >
                <div className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white shadow-lg">
                  {isPlaying ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
              </motion.button>

              {/* Progress Bar */}
              <div className="flex-1">
                <div
                  ref={progressBarRef}
                  className="w-full h-2 bg-white/10 rounded-full cursor-pointer overflow-hidden relative group"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  style={{ touchAction: 'none' }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-red-600"
                    style={{ 
                      width: `${duration ? (progress / duration) * 100 : 0}%`,
                      pointerEvents: 'none'
                    }}
                    layout
                  />
                  <motion.div 
                    className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md 
                      transition-opacity ${isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    style={{ 
                      left: `${duration ? (progress / duration) * 100 : 0}%`,
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Waves Animation */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-around">
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-red-500/30"
                    animate={{
                      height: [2, Math.random() * 15 + 5, 2],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}
