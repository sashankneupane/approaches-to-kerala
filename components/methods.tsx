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

      <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity">
        <Image
          src={`/photos/covers/${student.name.toLowerCase()}.jpg`}
          alt={student.project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={30}
          placeholder="blur"
          blurDataURL={`data:image/jpeg;base64,/9j/4AAQSkZJRg==`}
          className="object-cover"
        />
      </div>

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

const MethodCard = ({ mode, students }: { 
  mode: string; 
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
        backgroundImage: `url('/photos/bg/${mode}.jpg')`
      }}
    />
    
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
    
    {/* Content */}
    <div className="relative h-full p-8 flex flex-col justify-between">
      <motion.h3 
        className="text-3xl md:text-4xl font-light text-white/90 mb-4"
        whileHover={{ x: 10 }}
      >
        {mode}
      </motion.h3>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-4 mt-8 md:hidden md:group-hover:block transition-all duration-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students
            .filter(student => student.project.mode === mode)
            .map((student, idx) => (
              <ProjectCard key={idx} student={student} />
            ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const modes = ['form', 'photo', 'audio', 'video'];

interface MethodsSectionProps {
  students: Student[];
  scrolled: boolean;
}

const MethodsSection: React.FC<MethodsSectionProps> = ({ students }) => {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl md:text-7xl font-light text-white/90 mb-16"
        >
          Methods
        </motion.h1>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modes.map(mode => (
            <MethodCard
              key={mode}
              mode={mode}
              students={students}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodsSection;
