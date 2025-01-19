"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import performances from "./data.json";
import Hero from '@/components/hero';

type ViewMode = 'timeline' | 'locations' | 'themes';

export default function Kerala360Page() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof performances)[0] | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  
  // Organize data by date and place
  const timelineData = performances.reduce((acc, video) => {
    if (!acc[video.date]) acc[video.date] = [];
    acc[video.date].push(video);
    return acc;
  }, {} as Record<string, typeof performances>);

  const placeData = performances.reduce((acc, video) => {
    if (!acc[video.place]) acc[video.place] = [];
    acc[video.place].push(video);
    return acc;
  }, {} as Record<string, typeof performances>);

  const renderVideoGrid = (videos: typeof performances) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {videos.map((video) => (
        <VideoCard
          key={video.videoUrl}
          video={video}
          onClick={() => setSelectedVideo(video)}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-black">
      <Hero
        images={["/projects/kerala-in-360/cover.jpg"]}
        title="Kerala in 360°"
        description="Step into an immersive journey through Kerala's cultural landscape"
      />

      <main className="relative pt-16 pb-32">
        {/* View Mode Navigation */}
        <div className="sticky top-0 z-30 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center gap-4 py-4">
              {[
                { id: 'timeline', label: 'Timeline', icon: '📅' },
                { id: 'locations', label: 'Locations', icon: '📍' },
              ].map((mode) => (
                <motion.button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id as ViewMode)}
                  className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${
                    viewMode === mode.id 
                      ? 'bg-white text-black' 
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl">{mode.icon}</span>
                  <span>{mode.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <AnimatePresence mode="wait">
            {viewMode === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-16"
              >
                {Object.entries(timelineData)
                  .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                  .map(([date, videos]) => (
                    <section key={date}>
                      <h2 className="text-2xl text-white/90 mb-8 sticky top-20 bg-black/80 backdrop-blur-sm py-4 px-4 rounded-lg">
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </h2>
                      {renderVideoGrid(videos)}
                    </section>
                  ))}
              </motion.div>
            )}

            {viewMode === 'locations' && (
              <motion.div
                key="locations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-16"
              >
                {Object.entries(placeData).map(([location, videos]) => (
                  <section key={location}>
                    <h2 className="text-2xl text-white/90 mb-8 sticky top-20 bg-black/80 backdrop-blur-sm py-4 px-4 rounded-lg">
                      {location}
                      <span className="text-sm text-white/50 ml-2">
                        ({videos.length} videos)
                      </span>
                    </h2>
                    {renderVideoGrid(videos)}
                  </section>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        )}
      </AnimatePresence>

      {/* Future uploads message */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black via-black/95 to-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-6">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
            <motion.div 
          className="w-6 h-6 rounded-full bg-white"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
            />
          </div>
        </div>
        <p className="text-xl text-white/90">
          More immersive experiences coming soon...
        </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface VideoCardProps {
  video: typeof performances[0];
  onClick: () => void;
}

// Video Card Component
const VideoCard = ({ video, onClick }: VideoCardProps) => (
  <motion.div
    className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer"
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
  >
    <Image
      src={video.thumbnail}
      alt={video.name}
      fill
      className="object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent 
      opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
    
    <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300
      group-hover:translate-y-0 translate-y-4">
      <h3 className="text-xl font-medium text-white mb-2">
        {video.name}
      </h3>
      <p className="text-white/70 text-sm line-clamp-2 mb-4">
        {video.description}
      </p>
      <div className="flex items-center gap-2 text-white/60">
        <span>{video.place}</span>
        <span>•</span>
        <motion.div
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-lg">▶</span>
        </motion.div>
      </div>
    </div>

    {/* Ambient Effects */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            duration: 2,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  </motion.div>
);

interface VideoModalProps {
  video: typeof performances[0];
  onClose: () => void;
}

// Video Modal Component
const VideoModal = ({ video, onClose }: VideoModalProps) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="relative w-full max-w-7xl mx-4 overflow-hidden rounded-2xl"
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      onClick={e => e.stopPropagation()}
    >
      <div className="aspect-video">
        <iframe
          src={`${video.videoUrl}?autoplay=1&rel=0`}
          className="w-full h-full"
          allow="accelerometer; autoplay; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </motion.div>
  </motion.div>
);
