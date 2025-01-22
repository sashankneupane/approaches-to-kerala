"use client";
import React, { useEffect, useState, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/hero";
import PhotoGrid from "@/components/photogrid";
import { motion, AnimatePresence } from "framer-motion";

const playfair = Playfair_Display({ subsets: ["latin"] });

interface PhotoSeriesProps {
  title: string;
  description: string;
  heroImages: string[];
  galleryImages: { src: string; alt: string; }[];
  author: {
    name: string;
    image: string;
    bio: string;
  };
  storyLink: string;
}

export default function PhotoSeries({
  title,
  description,
  heroImages,
  galleryImages,
  author,
  storyLink
}: PhotoSeriesProps) {
  const [scrollY, setScrollY] = useState(0);
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-black/95">
      <Hero
        images={heroImages}
        title={title}
        description={description}
        imageInterval={5000}
      />
      
      {/* Author Section */}
      <section className="relative py-24 bg-gradient-to-b from-black/80 to-black/90">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={author.image}
                alt={author.name}
                width={256}
                height={256}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="flex-1 text-center md:text-left">
              <motion.h2 
                className="text-2xl md:text-3xl text-white/90 font-light mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontFamily: playfair.style.fontFamily }}
              >
                By {author.name}
              </motion.h2>
              <motion.p 
                className="text-lg text-white/70 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {author.bio}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Mode CTA Section */}
      <section className="relative py-16 bg-gradient-to-b from-black/90 to-black/95">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl md:text-3xl text-white/90 font-light mb-6">
              Ready for an Immersive Experience?
            </h3>
            <p className="text-white/70 mb-8">
              Journey through the story with full-screen images and detailed narratives
            </p>
            <Link href={storyLink}>
              <motion.button
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm 
                         border border-white/20 flex items-center gap-3 mx-auto transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Experience in Story Mode</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Floating Story Mode Button */}
      <AnimatePresence>
        {scrollY > 800 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed top-4 right-4 z-40"
          >
            <Link href={storyLink}>
              <motion.div
                className="bg-black/40 hover:bg-black/60 rounded-full p-3 backdrop-blur-sm
                          border border-white/20 flex items-center gap-2 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white/90 text-sm">Story Mode</span>
                <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Grid Section */}
      <section className="py-24" ref={gridRef}>
        <div className="px-4">
          <PhotoGrid images={galleryImages} type={"M"} showLayoutToggle={true} />
        </div>
      </section>
    </main>
  );
}