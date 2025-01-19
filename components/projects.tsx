"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Student {
  name: string;
  fullName: string;
  featuredImg: string;
  project: {
    title: string;
    slug: string;
    description: string;
    coverImg?: string;
  };
}

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
    <div className="w-full bg-black">
                <motion.div
                    className="py-24 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-sm uppercase tracking-widest text-white/40 mb-8">Discover</p>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
                      Explore innovative projects crafted by our talented students, showcasing their creativity and technical expertise.
                    </p>
                    <h2 className="text-6xl md:text-8xl font-bold mb-12" style={{ fontFamily: 'Impact' }}>
                      Student Works
                    </h2>
                    <div className="flex justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-16 h-[1px] bg-white/20"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                        />
                      ))}
                    </div>
                  </motion.div>
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-[1px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Project Section Intro */}
        {students.map((student, index) => (
          <Link 
            key={index}
            href={`/${student.project.slug}`}
            className="block"
          >
            <div className="group relative aspect-[3/4] overflow-hidden bg-black/20 hover:z-10 cursor-pointer">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500
                  group-hover:scale-105 group-hover:grayscale-0 grayscale"
                style={{
                  backgroundImage: `url('/photos/covers/${student.name.toLocaleLowerCase()}.jpg')`
                }}
              />

              {/* Permanent Name Display (Top Left) */}
              <div className="absolute top-0 left-0 p-3 bg-gradient-to-r from-black/90 to-transparent">
                <p className="text-white text-sm font-medium">
                  {student.name}
                </p>
              </div>

              {/* Project Info Container */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent
                transform transition-transform duration-500 ease-out
                translate-y-[calc(100%-3rem)] group-hover:translate-y-0">
                {/* Project Title (Always Visible) */}
                <div className="mb-2">
                  <h4 className="text-white text-lg font-semibold leading-tight">
                    {student.project.title}
                  </h4>
                </div>

                {/* Project Description (Revealed on Hover) */}
                <div className="space-y-3 pt-2">
                  <p className="text-white/60 text-sm line-clamp-3">
                    {student.project.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default StudentsGrid;