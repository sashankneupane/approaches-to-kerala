import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StudentsGrid from '@/components/student-grid';
import FeaturedPhoto from '@/components/featured-photo';
import { students } from './data'; // Import your data

// Function to shuffle the array
function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const AboutPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const shuffledStudents = shuffleArray(students); // Shuffle data here

  return (
    <div className="w-full h-full text-gray-400 flex flex-col items-start md:py-20 bg-opacity-50">
      {/* About Section */}
      <motion.section
        className="flex flex-col items-start w-full transition-opacity duration-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col md:flex-row w-11/12 ml-auto">
          <div className="w-full md:w-3/5 mb-8 md:mb-0">
            <p className="text-3xl md:text-4xl font-bold mb-8 text-red-800">About</p>
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify">
              <em>Approaches to Kerala</em> is a digital compilation of the vibrant culture, history, and traditions of Kerala, South India. This website brings together multimedia content collected during ethnographic fieldwork as part of a J-term class offered by NYU Abu Dhabi. It offers a glimpse into the people, places, and practices that make Kerala unique.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify">
              From the intricate performances of Theyyam to the craftsmanship behind traditional dhows and the eco-conscious architecture that reflects Kerala’s harmony with nature, this platform showcases the diverse ways in which culture is preserved, practiced, and transformed. Through videos, photographs, audio recordings, and 360° media, we aim to present an immersive and thoughtful journey into Kerala’s multifaceted cultural heritage.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify">
              <em>Approaches to Kerala</em> invites you to explore this rich tapestry of culture and tradition and to engage with the voices, histories, and practices of Kerala.
            </p>
          </div>
          <div className="hidden md:flex flex-1 h-full w-full md:w-2/5 ml-16 my-auto">
            <FeaturedPhoto />
          </div>
        </div>
        <div className="md:hidden w-full mt-8">
          <FeaturedPhoto />
        </div>
        <hr className="my-8 border-t border-gray-300" />

        {/* Students Section */}
        <div className="w-full py-6">
          <StudentsGrid students={shuffledStudents} />
        </div>

        <hr className="my-8 border-t border-gray-300" />
      </motion.section>
    </div>
  );
}

export default AboutPage;