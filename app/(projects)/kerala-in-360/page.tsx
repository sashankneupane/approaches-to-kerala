'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/hero';
import videos from './data.json';
import { TbTimeline } from 'react-icons/tb';
import { IoLocationOutline } from 'react-icons/io5';
// import {IoExpand} from 'react-icons/io5';
import VideoModal from '@/components/video-modal';
import FilterModal from '@/components/filter-modal'
import { HiAdjustments } from 'react-icons/hi'

const themes = [...new Set(videos.flatMap(v => v.themes))];
const daytimes = [...new Set(videos.map(v => v.daytime))];

// Get thumbnails for hero section
const heroImages = ["/photos/kerala-in-360/cover.jpg"];

export default function Kerala360() {
  const [activeFilters, setActiveFilters] = useState<{
    themes: string[],
    daytime: string
  }>({ themes: [], daytime: '' })
  
  const [groupBy, setGroupBy] = useState<'date' | 'location'>('date')
  const [filteredVideos, setFilteredVideos] = useState(videos)
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  useEffect(() => {
    setFilteredVideos(videos.filter(video => {
      const themeMatch = activeFilters.themes.length === 0 || 
        activeFilters.themes.some(t => video.themes.includes(t))
      const daytimeMatch = !activeFilters.daytime || video.daytime === activeFilters.daytime
      return themeMatch && daytimeMatch
    }))
  }, [activeFilters])

  const groupedVideos = filteredVideos.reduce((acc, video) => {
    const groupKey = groupBy === 'date' ? video.date : video.location
    
    if (!acc[groupKey]) {
      acc[groupKey] = []
    }
    acc[groupKey].push(video)
    return acc
  }, {} as Record<string, typeof videos>)

  // Sort groups by key
  const sortedGroups = Object.entries(groupedVideos).sort(([a], [b]) => {
    if (groupBy === 'date') {
      return new Date(a).getTime() - new Date(b).getTime()
    }
    return a.localeCompare(b)
  })

  return (
    <div className="min-h-screen bg-black relative">

      <Hero 
        images={heroImages}
        title="Kerala in 360°"
        description="Experience the beauty of God's Own Country through immersive 360° videos"
        author="Sashank Neupane"
      />
      
      {/* Enhanced gradient overlay for smoother transition */}
      <div className="absolute left-0 right-0 h-64 -translate-y-64" />
      
      <div className="relative z-10 px-4 md:px-8 pb-24">
        <motion.div className="max-w-7xl mx-auto">
          {/* Video Grid */}
          <div className="space-y-16"> {/* Increased spacing between groups */}
            {sortedGroups.map(([group, groupVideos]) => (
              <div key={group}>
                <motion.div 
                  layout
                  className="relative mb-8"
                >
                  <motion.div
                    className="absolute -left-8 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-purple-500 to-white rounded-full opacity-50"
                    animate={{ height: [48, 64, 48] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.h3 
                    layout
                    className="text-2xl md:text-3xl text-white/90 font-light pl-6 flex items-baseline gap-3"
                  >
                    <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                      {groupBy === 'date' 
                        ? new Date(group).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : group
                      }
                    </span>
                    <span className="text-base text-white/40">
                      {groupVideos.length} video{groupVideos.length !== 1 ? 's' : ''}
                    </span>
                  </motion.h3>
                  <div className="absolute left-6 right-0 h-px bg-gradient-to-r from-white/20 to-transparent mt-4" />
                </motion.div>

                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {groupVideos.map((video, index) => (
                      <motion.div
                        key={video.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-xl transition-all duration-500"
                      >
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                            alt={video.name}
                            width={720}
                            height={405}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80" />
                        </div>
                        
                        <div className="absolute inset-0 p-2 flex flex-col justify-between">
                          <div className="flex gap-2">
                            {video.themes.map(theme => (
                              <span key={theme} className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full text-xs text-white/90">
                                {theme}
                              </span>
                            ))}
                          </div>
                          
                          <div>
                            <h3 className="text-md font-medium text-white mb-1 ml-1">{video.name}</h3>
                            <div className="flex items-center gap-3 text-white/70">
                              <span className="flex items-center gap-1 text-sm">
                                <IoLocationOutline className="w-4 h-4" />
                                {video.location}
                              </span>
                              <span>•</span>
                              <span className="capitalize text-sm">{video.daytime}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedVideo(video)}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
                            >
                              <svg className="w-6 h-6 text-black translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </motion.div>
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Controls */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-center gap-2">
        {/* Filter Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFilterOpen(true)}
          className="p-3 bg-white text-purple-900 rounded-full shadow-lg"
          title="Open Filters"
        >
          <HiAdjustments className="w-5 h-5" />
        </motion.button>

        {/* Group Toggle */}
        <div className="flex flex-col items-center gap-2 p-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-xl">
          <button
            onClick={() => setGroupBy('date')}
            className={`p-2 rounded-full transition-all ${
          groupBy === 'date'
            ? 'bg-white text-purple-900'
            : 'text-white/70 hover:bg-white/10'
            }`}
            title="Group by Date"
          >
            <TbTimeline className="w-5 h-5" />
          </button>
          <button
            onClick={() => setGroupBy('location')}
            className={`p-2 rounded-full transition-all ${
          groupBy === 'location'
            ? 'bg-white text-purple-900'
            : 'text-white/70 hover:bg-white/10'
            }`}
            title="Group by Location"
          >
            <IoLocationOutline className="w-5 h-5" />
          </button>
        </div>

        {/* Immersive Mode Button */}
        {/* <Link
          href="/kerala-in-360/immerse"
          className="p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        >
          <IoExpand className="w-5 h-5" />
        </Link> */}
      </div>

      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="my-16 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl"
        >
          <p className="text-white/90 text-sm font-light">
        ✨ More videos being uploaded soon...
          </p>
        </motion.div>
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        themes={themes}
        daytimes={daytimes}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoId={selectedVideo?.id}
        videoTitle={selectedVideo?.name}
      />


    </div>
  )
}
