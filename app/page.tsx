'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import About from './about';

const projects = [
  { 
    title: 'Power of Performances', 
    author: 'Sashank Neupane', 
    mode: 'video', 
    link: '/projects/power-of-performances',
    description: 'Performances are not just art and visual spectacle but they hold deeper culture signifance, heritage, and identity.'
  },
  { 
    title: 'Potraits of Kerala', 
    author: 'Bipana Bastola', 
    mode: 'photo',
    link: '/projects/potraits-of-kerala',
    description: 'Potraits of Kerala'
  },
  { 
    title: 'Colors of Kerala', 
    author: 'Soyuj Jung Basnet', 
    mode: 'photo',
    link: '/projects/colors-of-kerala',
    description: 'Colors of Kerala'
  },
];

// Helper Components
const SectionTitle = ({ title }) => (
  <div className="p-8 text-center text-white rounded-lg shadow-lg">
    <motion.h1
      className="text-5xl md:text-7xl font-extrabold tracking-wider"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      {title}
    </motion.h1>
    <div className="mt-4 w-20 h-1 bg-white mx-auto rounded"></div>
  </div>
);

const ScrollHint = () => (
  <div className="absolute bottom-4 w-full text-center text-white">
    <motion.p
      className="text-lg font-semibold mb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      Immerse into Kerala
    </motion.p>
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <div className="animate-bounce w-6 h-6 border-t-2 border-r-2 border-white rounded-full rotate-45 transform mb-1"></div>
      <p className="text-sm font-light">Scroll</p>
    </motion.div>
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="border-white border-2 cursor-pointer min-w-full bg-gray-400 bg-opacity-40 shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
    {/* Project Details Section */}
    <div className="p-4">
      <h2 className="text-lg font-bold text-white">{project.title}</h2>
      <p className="text-white font-bold text-sm mt-1">{project.author}</p>
    </div>
  </div>
);


// Main Component
export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.2);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const breakpointColumnsObj = {
    default: 6,
    1100: 5,
    900: 4,
    700: 3,
    500: 2
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Landing Section */}
      <motion.section
        className="relative min-h-screen w-full flex flex-col items-center justify-center transition-opacity duration-700"
        animate={{ opacity: scrolled ? 0 : 1 }}
      >
        <div className="absolute inset-0 -z-10">
          <video autoPlay muted loop className="object-cover w-full h-full">
            <source src="/videos/landing.mov" type="video/mp4" />
          </video>
        </div>
        <SectionTitle title="Approaches to Kerala" />
        <ScrollHint />
      </motion.section>

      <motion.section
        className="min-h-screen w-full transition-opacity duration-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
      >
        <div className="grid grid-cols-4 w-full h-screen">
          {['text', 'audio', 'photo', 'video' ].map((mode) => (
            <div
              key={mode}
              className="relative group flex items-center justify-center overflow-hidden text-white transition-transform duration-300 opacity-75 hover:opacity-100"
              style={{
                backgroundImage: `url('/bg/${mode.toLowerCase()}.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50"></div>

              {/* Mode Name */}
              <p
                className="absolute text-4xl md:text-5xl font-custom capitalize text-white tracking-wider z-20 group-hover:opacity-0 duration-300"
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
                  transform: "translate(-50%, -50%)",
                  top: "50%",
                  left: "50%",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                {mode}
              </p>

              {/* Projects on Hover */}
              <div className="absolute inset-0 hidden group-hover:flex flex-col items-center justify-center p-6 bg-black bg-opacity-40 transition-all z-10">
                <div className="space-y-8 w-full">
                  {projects.filter((project) => project.mode === mode).map((project) => (
                    <ProjectCard key={project.title} project={project} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <About />

    </div>
  );
}
