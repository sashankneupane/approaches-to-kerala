'use client';
import { motion } from 'framer-motion';
import { students } from '@/app/data';

interface CreditSection {
  title: string;
  names: string[];
}

const extractAndSortFormalNames = (students: { formalName: string }[]) => {
  const allFormalNames = students
    .flatMap(student => student.formalName.split(';').map(name => name.trim())); // Split and trim

  const sortedFormalNames = allFormalNames.sort((a, b) => {
    const surnameA = a.split(',')[0].trim().toLowerCase();
    const surnameB = b.split(',')[0].trim().toLowerCase();
    return surnameA.localeCompare(surnameB);
  });

  return sortedFormalNames;
};

const credits: CreditSection[] = [
  {
    title: "Course Instructors",
    names: ["Prof. Samuel Mark Anderson", "Prof. Neelima Jayachandran"]
  },
  {
    title: "Students",
    names: extractAndSortFormalNames(students)
  },
  {
    title: "Website Development",
    names: ["Sashank Neupane", "Soyuj Jung Basnet", "Bipana Bastola", "Yumi Omori", "Khater Abdelrahman"]
  },
  {
    title: "Special Thanks",
    names: [
      "Carol Brandt, Gloria Spittel, Rae Harker, and NYUAD Global Learning",
      "A.K. Beerankutty, Noushad Yoosef, and the Kerala Social Centre Abu Dhabi",
      "Prof. Jisha Kalyani, and the School of Folklore Studies, University of Calicut",
      "Prof. P.P. Abdul Razak",
      "Hema Seetharam, DEZIGN KSHETR",
      "Murali Panicker",
      "Balakrishnan Peruvannan",
      "The Thekkan Kariyathan Temple Committee",
      "Guru Yasir Kurikkal, Kendra Sangeet Natak Akademi"
    ]
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
    <section className="w-full py-32">
      <div className='max-w-7xl mx-auto px-4'>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-auto text-5xl md:text-7xl font-light text-white/90 mb-16"
        >
          Credits
        </motion.h1>

        {/* Credit sections with enhanced styling */}
        <div className="relative space-y-8">
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
              <div className={`grid gap-x-8 gap-y-3 ${section.title === "Special Thanks" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
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
      </div>
    </section>
  );
}
