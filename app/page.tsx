'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Data
const students = [
  { name: 'Laakhay', dp: '/dp/laakhay.png' },
  { name: 'Bipana', dp: '/dp/laakhay.png' },
  { name: 'Soyuj', dp: '/dp/laakhay.png' },
];

const projects = [
  { title: 'Project 1', author: 'Author 1', logo: '/dp/laakhay.png' },
  { title: 'Project 2', author: 'Author 2', logo: '/dp/laakhay.png' },
  { title: 'Project 3', author: 'Author 3', logo: '/dp/laakhay.png' },
];

// Helper Components
const SectionTitle = ({ title }) => (
  <div className="bg-black bg-opacity-40 p-8 text-center text-white rounded-lg shadow-lg">
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
  <div className="w-full flex flex-col sm:flex-row items-center sm:items-start bg-gray-100 rounded-lg shadow-lg p-4 mb-6">
    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
      <Image
        src={project.logo}
        alt={`${project.title} Logo`}
        className="w-16 h-16 rounded-full shadow-md"
        width={64}
        height={64}
      />
    </div>
    <div className="flex-1 text-center sm:text-left">
      <p className="text-xl font-semibold text-gray-800">{project.title}</p>
      <p className="text-sm text-gray-600">{project.author}</p>
      <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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

  return (
    <div className="w-full overflow-x-hidden">
      {/* Landing Section */}
      <motion.section
        className="relative min-h-screen w-full flex flex-col items-center justify-center transition-opacity duration-700"
        animate={{ opacity: scrolled ? 0 : 1 }}
      >
        <div className="absolute inset-0 -z-10">
          <video autoPlay loop muted className="object-cover w-full h-full">
            <source src="/placeholder-video.mp4" type="video/mp4" />
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
    {['text', 'audio', 'video', '360'].map((mode) => (
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
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity"></div>

        {/* Mode Name */}
        <p className="absolute text-3xl font-semibold tracking-wide capitalize transition-opacity duration-300 group-hover:opacity-0">
          {mode}
        </p>

        {/* Projects on Hover */}
        <div className="absolute inset-0 hidden group-hover:flex flex-col items-center justify-center p-6 bg-black bg-opacity-80 transition-all z-10">
          <p className="mb-4 text-xl font-bold uppercase">{mode} Projects</p>
          <div className="space-y-4">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</motion.section>



      {/* Info Section */}
      <motion.section
        className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-black px-6 py-12 md:px-12 md:py-20 transition-opacity duration-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
      >
        <p className="max-w-4xl text-lg md:text-xl leading-relaxed mb-10 text-left">
          Discover Kerala's evolving cultural identity through an engaging journey of research, art, and heritage.
        </p>

        <div className="mb-12 text-left">
          <p className="text-lg md:text-xl font-medium">Professor: <span className="font-semibold">Samuel Mark Anderson</span></p>
          <p className="text-lg md:text-xl font-medium">Trip Advisor: <span className="font-semibold">Anna</span></p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
          {students.map((student, index) => (
            <div
              key={index}
              className="w-20 h-20 md:w-24 md:h-24 bg-gray-400 rounded-full shadow-md hover:scale-105 transition-transform"
              style={{ backgroundImage: `url('${student.dp}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
