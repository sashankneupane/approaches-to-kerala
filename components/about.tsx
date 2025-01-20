'use client';
import React from 'react';
import { motion } from 'framer-motion';


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
        </div>
      </div>
    </div>
  );
};

export default AboutPage;