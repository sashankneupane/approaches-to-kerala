'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import AboutPage from './about';

import { projects } from './data';
import type { Project } from './types';

const SectionTitle = ({ title } : { title: string }) => (
  <div className="p-8 text-center text-white rounded-lg shadow-lg">
    <motion.h1
      className="text-5xl md:text-7xl font-extrabold tracking-wider"
      style={{ fontFamily: 'Impact' }}
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
      style={{ fontFamily: 'Impact' }}
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
      <p className="text-sm font-light"
      style={{ fontFamily: 'Impact' }}>
        Scroll</p>
    </motion.div>
  </div>
);

const ProjectCard = ({ project } : {project: Project}) => (
  <div className="border-white border-2 cursor-pointer min-w-full bg-gray-400 bg-opacity-40 shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
    {/* Project Details Section */}
    <a className="p-4" href={project.link}>
      <h2 className="text-lg font-bold text-white"
      style={{ fontFamily: 'Impact' }}>{project.title}</h2>
      <p className="text-white font-bold text-sm mt-1"
      >{project.author}</p>
    </a>
  </div>
);


// Main Component
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const landingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting); // When the landing section is not in view
      },
      { threshold: 0.2 } // Trigger when 20% of the element is out of view
    );

    const currentRef = landingRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Landing Section */}
      <motion.section
        ref={landingRef}
        className="relative min-h-screen w-full flex flex-col items-center justify-center transition-opacity duration-700"
        animate={{ opacity: scrolled ? 0 : 1 }}
      >
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 -z-10 object-cover w-full h-full bg-opacity-70"
        >
          <source src="/videos/landing.mov" type="video/mp4" />
        </video>
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
                  fontFamily:'Impact',
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

      <AboutPage />

    </div>
  );
}
