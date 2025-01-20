"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Student } from '@/app/types';

interface StudentsGridProps {
  students: Student[];
}

const StudentsGrid: React.FC<StudentsGridProps> = ({ students }) => {
  const [isClient, setIsClient] = useState(false);
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isClient) return null;

  return (
    <div className="w-full py-32">
      <div className='max-w-7xl mx-auto px-4'>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-auto text-5xl md:text-7xl font-light text-white/90 mb-16"
        >
          Students
        </motion.h1>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Project Cards */}
          {students.map((student, index) => (
            <Link 
              key={index}
              href={`/${student.project.slug}`}
              className="block"
            >
              <div className="group relative aspect-[3/4] overflow-hidden bg-black/20 hover:z-10 cursor-pointer">
                {/* Default B&W Profile Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out
                    group-hover:opacity-0 grayscale will-change-transform"
                  style={{
                    backgroundImage: `url('/photos/dp/${student.name.toLocaleLowerCase()}.jpg')`
                  }}
                />

                {/* Hover Color Cover Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out
                    opacity-0 group-hover:opacity-100 transform scale-[1.02] group-hover:scale-100 will-change-transform"
                  style={{
                    backgroundImage: `url('/photos/covers/${student.name.toLocaleLowerCase()}.jpg')`
                  }}
                />

                {/* Permanent Name Display (Top Left) */}
                <div className="absolute top-0 left-0 p-3 bg-gradient-to-r from-black/90 to-transparent">
                  <p className="text-white text-xs font-semibold">
                    {student.fullName}
                  </p>
                </div>

                {/* Project Info Container */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent
                  transform transition-transform duration-500 ease-out
                  translate-y-[calc(100%-3rem)] group-hover:translate-y-0">
                  {/* Project Title (Always Visible) */}
                  <div className="mb-2">
                    <h4 className="text-white text-xs font-bold leading-tight">
                      {student.project.title}
                    </h4>
                  </div>

                  {/* Project Description (Revealed on Hover) */}
                  {/* <div className="space-y-3 pt-2">
                    <p className="text-white/60 text-sm line-clamp-3">
                      {student.project.description}
                    </p>
                  </div> */}
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentsGrid;