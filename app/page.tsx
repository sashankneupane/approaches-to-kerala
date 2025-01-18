'use client';
import React from 'react';
import Hero from '@/components/hero';
import AboutPage from '@/components/about';
import MethodsPage from '@/components/methods';
import Projects from '@/components/projects';
import Credits from '@/components/credits';
import { students, featured_photos } from './data';

export default function Home() {
  const heroImages = featured_photos.map(photo => `/photos/${photo}.jpg`);
  
  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-b from-black via-black to-gray-900">
      <Hero 
        images={heroImages}
        title="Approaches to Kerala"
        description="Exploring the cultural essence through different mediums"
      />
      <AboutPage />
      <MethodsPage students={students} scrolled={true} />
      <Projects students={students} />
      <Credits />
    </div>
  );
}