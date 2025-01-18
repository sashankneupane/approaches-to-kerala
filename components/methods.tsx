import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Student } from '../app/types';

const ProjectCard = ({ student }: { student: Student }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 
              border-l-2 border-t border-white/20 shadow-xl"
  >
    <Link href={`/${student.project.slug}`}>
      <h3 className="text-lg font-light tracking-wide text-white/90">{student.project.title}</h3>
      <p className="text-sm text-white/70 mt-2 font-light">{student.fullName}</p>
    </Link>
  </motion.div>
);

const MethodCard = ({ mode, description, students }: { 
  mode: string; 
  description: string; 
  students: Student[];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative min-h-[70vh] rounded-2xl overflow-hidden group"
  >
    {/* Background */}
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700
                 group-hover:scale-110 brightness-50"
      style={{
        backgroundImage: `url('/bg/${mode.toLowerCase()}.jpg')`
      }}
    />
    
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
    
    {/* Content */}
    <div className="relative h-full p-8 flex flex-col justify-between">
      <div>
        <motion.h3 
          className="text-3xl md:text-4xl font-light text-white/90 mb-4"
          whileHover={{ x: 10 }}
        >
          {mode}
        </motion.h3>
        <p className="text-lg text-white/70 max-w-md">{description}</p>
      </div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="space-y-4 mt-8"
      >
        <h4 className="text-white/50 text-sm uppercase tracking-wider mb-6">Featured Projects</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students
            .filter(student => student.project.mode === mode.toLowerCase())
            .map((student, idx) => (
              <ProjectCard key={idx} student={student} />
            ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export const modeDescriptions = {
  form: "Experience tactile narratives through artifacts and installations",
  photo: "Visual stories capturing Kerala's cultural essence",
  audio: "Immerse in the soundscapes of tradition",
  video: "Dynamic perspectives of living heritage"
};

interface MethodsSectionProps {
  students: Student[];
  scrolled: boolean;
}

const MethodsSection: React.FC<MethodsSectionProps> = ({ students }) => {
  return (
    <section className="min-h-screen bg-black py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white/90 mb-6">
            Exploring Through Different Mediums
          </h2>
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(modeDescriptions).map(([mode, description]) => (
            <MethodCard
              key={mode}
              mode={mode}
              description={description}
              students={students}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodsSection;
