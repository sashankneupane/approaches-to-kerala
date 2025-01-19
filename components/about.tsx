'use client';
import React from 'react';
import { motion } from 'framer-motion';

const HighlightNumber = ({ number, label }: { number: string, label: string }) => (
  <div className="text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="block text-6xl font-light text-white/90 mb-2">{number}</span>
      <span className="text-sm uppercase tracking-wider text-white/60">{label}</span>
    </motion.div>
  </div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Hero Title Section */}
      <div className="relative h-[40vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <p className="text-sm uppercase tracking-widest text-white/40 mb-8">Overview</p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-light text-white/90"
          >
            About the Project
          </motion.h1>
          <div className="h-px w-32 mx-auto" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-5xl mx-auto"
          >
            Understanding Kerala&apos;s cultural heritage through multisensory research and documentation
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Introduction Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-light text-white/90">
              Tracking Culture in Transition
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Through ethnographic experiments and multisensory data collection, we explore 
              how heritage and ritual reveal social change, while contemporary art and 
              architecture reflect deep histories.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <HighlightNumber number="15" label="Students" />
            <HighlightNumber number="4" label="Approaches" />
            <HighlightNumber number="1" label="Region" />
            <HighlightNumber number="∞" label="Perspectives" />
          </div>
        </motion.div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            {
              title: "Multisensory Collection",
              desc: "Videography, soundscapes, and recipes capture the full spectrum of cultural expression",
              icon: "📹"
            },
            {
              title: "Collaborative Research",
              desc: "Polyvocal partnerships between disciplines and communities",
              icon: "🤝"
            },
            {
              title: "Multimodal Presentation",
              desc: "Interactive media, images, and performance bring research to life",
              icon: "🎨"
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="backdrop-blur-sm bg-white/5 rounded-xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-light text-white/90 mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;