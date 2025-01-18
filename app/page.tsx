'use client';
import React from 'react';
import Hero from '@/components/hero';
import AboutPage from '@/components/about';
import MethodsIntro from '@/components/methods-intro';
import MethodsPage from '@/components/methods';
import Projects from '@/components/projects';
import Credits from '@/components/credits';
import { students } from './data';

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden bg-black">
      <Hero />
      <AboutPage />
      <MethodsIntro />
      <MethodsPage students={students} scrolled={true} />
      <Projects students={students} />
      <Credits />
    </div>
  );
}