"use client";
import React from "react";
import Hero from "@/components/hero";
import PhotoGrid from "@/components/photogrid";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PhotoGalleryPage() {
  // Hero images array
  const heroImages = [
    "/photos/bg/fire.jpg",
  ];

  // Gallery images array
  const galleryImages = [];
  for (let i = 1; i <= 20; i++) {
    galleryImages.push({
        src: `/photos/photogallery/gallery/${i}-min.jpg`,
        alt: `Photo ${i}`,
    });
  }

  const photoSeries = [
    {
      title: "People, Nature, Theyyam",
      description: "A visual journey through Kerala's culture, landscapes, and rituals",
      image: "/photos/photogallery/people-nature-theyyam/story/1.jpg",
      galleryLink: "/photogallery/people-nature-theyyam",
      storyLink: "/photogallery/people-nature-theyyam/story"
    },
    {
      title: "Kerala in Focus",
      description: "Intimate portraits and stories from the heart of Kerala",
      image: "/photos/photogallery/kerala-in-focus/story/0.jpg",
      galleryLink: "/photogallery/kerala-in-focus",
      storyLink: "/photogallery/kerala-in-focus/story"
    }
  ];

  return (
    <main className="bg-black/95">
      <Hero
        images={heroImages}
        title="Photo Gallery"
        description="Explore our curated collection of stunning images that showcase the essence of our travels and stories."
        imageInterval={5000}
      />
      
      {/* Overview Section */}
      <section className="relative py-24 bg-gradient-to-b from-black/80 to-black/90">
        <div className="relative z-10 max-w-4xl mx-auto space-y-4 px-4 text-center">
          <p className="text-sm uppercase tracking-widest text-white/40 mb-8">Gallery Overview</p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-light text-white/90"
          >
            Visual Journey Through Kerala
          </motion.h1>
          <div className="h-px w-32 mx-auto bg-white/20" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-5xl mx-auto"
          >
            A curated collection of moments capturing the vibrant culture, breathtaking landscapes, 
            and intimate stories of Kerala&apos;s people and traditions.
          </motion.p>
        </div>
      </section>
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/95 to-black pointer-events-none" />
        <PhotoGrid 
          images={galleryImages}
          type="M"
          showLayoutToggle={true}
          showTitle={false}
          showSubtitle={false}
        />
      </div>

      {/* Segway Section with smoother gradient transition */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-black pointer-events-none" />
        
        <div className="relative">
          <div className="container mx-auto px-4 text-center mb-16">
            <motion.p 
              className="text-white/60 uppercase tracking-widest mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Featured Collections
            </motion.p>
            <motion.h2 
              className="text-4xl md:text-6xl text-white/90 font-light mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Discover Our Photo Series
            </motion.h2>
            
            {/* Decorative element instead of line */}
            <motion.div 
              className="flex items-center justify-center gap-3 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="w-4 h-4 rotate-45 bg-white/20" />
              <span className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="w-3 h-3 rounded-full bg-white/20" />
            </motion.div>

            <motion.p 
              className="text-xl text-white/70 max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Dive deeper into our curated collections that explore the rich cultural tapestry of Kerala through different lenses.
            </motion.p>

            {/* Grid container for side-by-side layout */}
            <div className="grid md:grid-cols-2 gap-8">
              {photoSeries.map((series, index) => (
                <motion.div
                  key={series.title}
                  className="relative aspect-video rounded-2xl overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Background Image with Overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${series.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  {/* Content Container */}
                  <div className="relative h-full flex flex-col items-center justify-end px-6 py-8 text-center">
                    
                    {/* Navigation Options */}
                    <div className="flex gap-6">
                      <Link href={series.galleryLink}>
                        <motion.div
                          className="group/btn flex flex-col justify-right items-center gap-2"
                          whileHover="hover"
                        >
                          <motion.div 
                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                                     flex items-center justify-center transition-all duration-300"
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                          >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                          </motion.div>
                          <span className="text-white/80 text-sm">Gallery</span>
                        </motion.div>
                      </Link>
                      
                      <Link href={series.storyLink}>
                        <motion.div
                          className="group/btn flex flex-col items-center gap-2"
                          whileHover="hover"
                        >
                          <motion.div 
                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                                     flex items-center justify-center transition-all duration-300"
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                          >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </motion.div>
                          <span className="text-white/80 text-sm">Story</span>
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
