'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Data
const students = [
  { name: 'Laakhay', dp: '/dp/laakhay.png' },
  { name: 'Bipana', dp: '/dp/laakhay.png' },
  { name: 'Soyuj', dp: '/dp/laakhay.png' },
  { name: 'Alia', dp: '/dp/laakhay.png' },
  { name: 'Carlota', dp: '/dp/laakhay.png' },
  { name: 'Yumi', dp: '/dp/laakhay.png' },
  { name: 'Timothy', dp: '/dp/laakhay.png' },
  { name: 'Didi', dp: '/dp/laakhay.png' },
  { name: 'Sayda', dp: '/dp/laakhay.png' },
  { name: 'Shahad', dp: '/dp/laakhay.png' },
  { name: 'Luca', dp: '/dp/laakhay.png' },
  { name: 'Khater', dp: '/dp/laakhay.png' },
  { name: 'Mustafa', dp: '/dp/laakhay.png' },
  { name: 'Noor', dp: '/dp/laakhay.png' },
  { name: 'Sungyun', dp: '/dp/laakhay.png' },
];

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

function StudentsGrid() {
  const [currentPage, setCurrentPage] = useState(0);
  const studentsPerPage = 6;

  const totalStudents = students.length; // Total number of students
  const totalPages = totalStudents; // Since we change 1 student at a time, there are as many pages as there are students

  const handleNext = () => {
    if (currentPage < totalStudents - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get the current students (displaying a full row of 6)
  const startIndex = currentPage; // Show students in sets of 6, but only shift one by one
  const currentStudents = students.slice(startIndex, startIndex + studentsPerPage);

  return (
    <div className="flex flex-col items-center">
      {/* Students Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-6">
      <button
      onClick={handlePrev}
      disabled={currentPage === 0}
      className={`px-4 py-2 ${currentPage === 0 ? 'cursor-not-allowed' : ''}`}
    >
      &lt;
    </button>
        {currentStudents.map((student, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-20 h-20 md:w-24 md:h-24 bg-gray-400 rounded-full shadow-md hover:scale-105 transition-transform"
              style={{
                backgroundImage: `url('${student.dp}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <p
              className="text-center mt-2 font-light text-gray-700"
              style={{ fontFamily: "'Roboto', 'Helvetica Neue', sans-serif", fontWeight: 300 }}
            >
              {student.name}  
            </p>
            
          </div>
          
        ))}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className={`px-4 py-2 ${
            currentPage === totalPages - 1 ? 'bg-gray-400 cursor-not-allowed' : ''
          }`}
        >
           &gt;
        </button>
      </div>
      
  </div>
  );
}


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

      {/* Info Section */}
      <motion.section
  className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-black px-6 py-12 md:px-12 md:py-20 transition-opacity duration-700"
  initial={{ opacity: 0 }}
  animate={{ opacity: scrolled ? 1 : 0 }}
>
  {/* About Section */}
  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-left">About</h2>
  <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify text-gray-700">
    <em>Approaches to Kerala</em> is a digital compilation of the vibrant culture, history, and traditions of Kerala, South India. This website brings together multimedia content collected during ethnographic fieldwork as part of a J-term class offered by NYU Abu Dhabi. It offers a glimpse into the people, places, and practices that make Kerala unique.
  </p>
  <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify text-gray-700">
    From the intricate performances of Theyyam to the craftsmanship behind traditional dhows and the eco-conscious architecture that reflects Kerala’s harmony with nature, this platform showcases the diverse ways in which culture is preserved, practiced, and transformed. Through videos, photographs, audio recordings, and 360° media, we aim to present an immersive and thoughtful journey into Kerala’s multifaceted cultural heritage.
  </p>
  <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify text-gray-700">
    <em>Approaches to Kerala</em> invites you to explore this rich tapestry of culture and tradition and to engage with the voices, histories, and practices of Kerala.
  </p>

  <hr className="my-8 border-t border-gray-300" />

    {/* Students Section */}
<StudentsGrid />

<hr className="my-8 border-t border-gray-300" />
  {/* Professor and Trip Advisor Section */}
  <div className="mb-12 text-left">
  <p
    className="text-lg md:text-xl"
    style={{ fontFamily: "'Roboto', 'Helvetica Neue', sans-serif", fontWeight: 100 }}
  >
    Professor: <span className="font-semibold">Samuel Mark Anderson</span>
</p>
  <p
    className="text-lg md:text-xl"
    style={{ fontFamily: "'Roboto', 'Helvetica Neue', sans-serif", fontWeight: 100 }}
  >
    Trip Advisor: <span className="font-semibold">Anna</span>
  </p>
</div>

</motion.section>

    </div>
  );
}
