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
    <div className="relative min-h-screen bg-gradient-to-b from-black via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-32">
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

        {/* Kerala Focus Section */}
        <motion.div 
          className="relative rounded-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm" />
          <div className="relative z-10 p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-8">
              Kerala: A Global Laboratory
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-lg text-white/80">
                  Our fieldwork explores Kerala&apos;s role as a crucible of global influences, 
                  from ancient trade routes to contemporary artistic expressions.
                </p>
                <ul className="space-y-4 text-white/70">
                  <li className="flex items-center gap-3">
                    <span className="text-white/40">◆</span>
                    Architecture connecting to UAE through religious networks
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-white/40">◆</span>
                    Spectacular Theyyam ceremonies
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-white/40">◆</span>
                    Contemporary art addressing sociopolitical challenges
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-light text-white/90">Our Approach</h3>
                <p className="text-white/70">
                  Students explore the politics of heritage and ethics of representation 
                  through diverse mediums, creating a virtual exhibition that captures 
                  Kerala&apos;s cultural dynamism.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
    </div>
  );
};

export default AboutPage;