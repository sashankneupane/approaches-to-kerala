'use client';
import React from 'react';
// import Image from 'next/image';
import { motion } from 'framer-motion';

// const HighlightNumber = ({ number, label }: { number: string, label: string }) => (
//   <div className="text-center">
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6 }}
//       className=" rounded-xl px-2 py-1 transition-all duration-100"
//     >
//       <span className="block text-3xl font-light text-white mb-1">{number}</span>
//       <span className="text-xs uppercase tracking-wider text-white/80">{label}</span>
//     </motion.div>
//   </div>
// );

const AboutPage: React.FC = () => {
  return (
    <div className="relative py-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl md:text-7xl font-light text-white/90 mb-16"
        >
          Overview
        </motion.h1>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Text Content - Left Column */}
          <motion.div 
            className="space-y-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-xl font-light text-white/80 leading-relaxed">
              This site exhibits the work of NYU Abu Dhabi students in the course 
              <span className='font-semibold'> Tradition and Transition in Kerala</span> (January 2025). Through ethnographic 
              experiments and multisensory data collection, we explore how heritage
              and ritual reveal social change, while contemporary art and architecture 
              reflect deep histories.
            </p>
          </motion.div>

          {/* Numbers Grid with Background - Right Column */}
          {/* <div className="relative">
            <div className="relative z-10 grid grid-cols-2 gap-8 py-4 px-8 rounded-2xl">
              <HighlightNumber number="15" label="Students" />
              <HighlightNumber number="4" label="Approaches" />
              <HighlightNumber number="1" label="Region" />
              <HighlightNumber number="∞" label="Perspectives" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;