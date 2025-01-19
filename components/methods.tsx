import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Student } from '../app/types';

const ProjectCard = ({ student }: { student: Student }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0 20px 30px rgba(0,0,0,0.3)"
    }}
    className="rounded-xl p-6 
              bg-gradient-to-br from-black/80 to-black/40
              backdrop-blur-sm
              border border-white/10
              shadow-lg hover:shadow-2xl
              transition-all duration-300
              relative overflow-hidden"
  >
    {student.featuredImg && (
      <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity">
        <Image
          src={`/dp/${student.featuredImg}`}
          alt={student.project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={30}
          placeholder="blur"
          blurDataURL={`data:image/jpeg;base64,/9j/4AAQSkZJRg==`}
          className="object-cover"
        />
      </div>
    )}
    <Link href={`/${student.project.slug}`} 
          className="relative z-10 block transform transition-transform duration-300 hover:translate-x-2">
      <h3 className="text-xl font-light tracking-wide text-white/90 
                     shadow-sm">
        {student.project.title}
      </h3>
      <p className="text-sm text-white/70 mt-3 font-light 
                    border-l-2 border-white/20 pl-3">
        {student.fullName}
      </p>
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
                 group-hover:scale-110 brightness-50 opacity-60"
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
          {modeDescriptions[mode as keyof typeof modeDescriptions].title}
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
  form: {
    title: "Form ☯",
    shortDesc: "3D documentation of artifacts",
    longDesc: "Experience tactile narratives through artifacts and installations"
  },
  photo: {
    title: "Photo 📷",
    shortDesc: "Visual narratives",
    longDesc: "Visual stories capturing Kerala's cultural essence"
  },
  audio: {
    title: "Sound 🎵",
    shortDesc: "Sonic landscapes",
    longDesc: "Immerse in the soundscapes of tradition"
  },
  video: {
    title: "Video 🎥",
    shortDesc: "360° documentation",
    longDesc: "Dynamic perspectives of living heritage"
  }
};

interface MethodsSectionProps {
  students: Student[];
  scrolled: boolean;
}

const MethodsSection: React.FC<MethodsSectionProps> = ({ students }) => {
  return (
    <section className="min-h-screen bg-black">
      {/* Hero Title Section */}
      <div className="relative h-[40vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
        <p className="text-sm uppercase tracking-widest text-white/40 mb-8">Research</p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-light text-white/90"
          >
            Methods
          </motion.h1>
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto"
          >
            Documenting Kerala&apos;s cultural heritage through diverse mediums and perspectives
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(modeDescriptions).map(([mode, { longDesc }]) => (
            <MethodCard
              key={mode}
              mode={mode}
              description={longDesc}
              students={students}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodsSection;
