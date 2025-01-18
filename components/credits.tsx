'use client';
import { motion } from 'framer-motion';

interface CreditSection {
  title: string;
  names: string[];
}

const credits: CreditSection[] = [
  {
    title: "Course Instructors",
    names: ["Prof. Samuel Mark Anderson", "Prof. Neelima Jayachandran"]
  },
  {
    title: "Students",
    names: [
      "Sashank Neupane", "Bipana Bastola", "Sungyun Sohn", "Soyuj Jung Basnet",
      "Alia Almuhairi", "Carlota Suarez Rochard", "Yumi Omori", "Timothy Chiu",
      "Dinobi Ibegbu", "Sayda Abusalih", "Shahad Alsaqqaf", "Luca",
      "Khater", "Mustafa Diri", "Noor"
    ]
  },
  {
    title: "Website Development",
    names: ["Sashank Neupane", "Soyuj Jung Basnet", "Bipana Bastola", "Yumi Omori"]
  }
];

const CreditSection = ({ title, names }: CreditSection) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="space-y-4"
  >
    <h3 className="text-white/50 text-sm tracking-wider uppercase">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
      {names.map((name, idx) => (
        <motion.p
          key={idx}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="text-white/90 font-light"
        >
          {name}
        </motion.p>
      ))}
    </div>
  </motion.div>
);

export default function Credits() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-black to-gray-950">
      {/* Top gradient transition */}
      <div className="absolute top-0 left-0 right-0 h-64 to-transparent" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-32">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white/90 mb-6">Credits</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent max-w-xs mx-auto"
          />
        </motion.div>

        {/* Credit sections with enhanced styling */}
        <div className="relative space-y-20">
          {credits.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-white/50 text-sm tracking-wider uppercase mb-8">{section.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                {section.names.map((name, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-white/90 font-light hover:text-white transition-colors duration-300"
                  >
                    {name}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer with enhanced styling */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center relative"
        >
          <div className="inline-block backdrop-blur-sm bg-white/5 rounded-full px-6 py-3 border border-white/10">
            <p className="text-white/40 text-sm">
              A project of NYU Abu Dhabi
            </p>
          </div>
          <p className="text-white/30 text-xs mt-4">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient for smooth ending */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  );
}
