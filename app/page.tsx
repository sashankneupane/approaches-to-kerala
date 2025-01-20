'use client';
import React from 'react';
import Hero from '@/components/hero';
import AboutPage from '@/components/about';
import MethodsPage from '@/components/methods';
import Projects from '@/components/projects';
import Credits from '@/components/credits';
import { students, featured_photos } from './data';
import { motion } from 'framer-motion';

export default function Home() {
  const heroImages = featured_photos.map(photo => `/photos/featured/${photo}.jpg`);
  
  return (
    <div className="w-full overflow-x-hidden">
      <Hero 
        images={heroImages}
        title="Approaches to Kerala"
        description="Exploring Expressive Culture through Different Mediums"
      />
      <div className="relative">
        {/* Background image with gradient overlay */}
        <div className="fixed inset-0 z-[-1]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/photos/featured/students.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/80 to-transparent backdrop-blur-sm" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <AboutPage />
          <MethodsPage students={students} scrolled={true} />
          <Projects students={students} />
          <Credits />
        </div>

        {/* Final reveal section with footer */}
        <div className="relative">
          {/* Image reveal with smooth transitions */}
          <div className="relative">
            {/* Top gradient overlay */}
            <motion.div 
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="absolute top-0 left-0 right-0 h-[50vh] z-10 bg-gradient-to-b from-black via-black/80 to-transparent"
            />

            {/* Main image */}
            <motion.div 
              initial={{ opacity: 0.3, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
              className="h-[90vh] bg-cover bg-center bg-fixed"
              style={{ backgroundImage: `url('/photos/featured/students.jpg')` }}
            />

            {/* Bottom gradient overlay */}
            <motion.div 
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="min-h-screen absolute bottom-0 left-0 right-0 h-[50vh] z-10 bg-gradient-to-t from-black via-black/80 to-transparent"
            />
          </div>

          {/* Footer container with adjusted position */}
          <div className="relative max-w-7xl mx-auto px-4 py-16 mt-[-20vh]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-block backdrop-blur-sm bg-white/20 rounded-full px-6 py-3 border border-white/10">
                <p className="text-white text-sm">
                  A project of NYU Abu Dhabi
                </p>
              </div>
              <p className="text-white/80 text-xs mt-4">
                © {new Date().getFullYear()} All rights reserved
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}