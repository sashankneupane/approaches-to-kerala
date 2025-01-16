import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const students = [
  { name: 'Sashank', dp: '/dp/laakhay.png' },
  { name: 'Bipana', dp: '/dp/laakhay.png' },
  { name: 'Sungyun', dp: '/dp/sungyun.png' },
  { name: 'Soyuj', dp: '/dp/laakhay.png' },
  { name: 'Alia', dp: '/dp/alia.jpg' },
  { name: 'Carlota', dp: '/dp/laakhay.png' },
  { name: 'Yumi', dp: '/dp/laakhay.png' },
  { name: 'Timothy', dp: '/dp/laakhay.png' },
  { name: 'Didi', dp: '/dp/laakhay.png' },
  { name: 'Sayda', dp: '/dp/laakhay.png' },
  { name: 'Shahad', dp: '/dp/laakhay.png' },
  { name: 'Luca', dp: '/dp/laakhay.png' },
  { name: 'Khater', dp: '/dp/laakhay.png' },
  { name: 'Mustafa', dp: '/dp/laakhay.png' },
  { name: 'Noor', dp: '/dp/laakhay.png' },
];

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function StudentsGrid() {
  const [currentPage, setCurrentPage] = useState(0);
  const [shuffledStudents, setShuffledStudents] = useState([]);
  const studentsPerPage = 6;
  const totalStudents = students.length;
  const totalPages = totalStudents;

  useEffect(() => {
    setShuffledStudents(shuffleArray(students));
  }, []);

  const handleNext = () => {
    if (currentPage < totalStudents - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage;
  const currentStudents = shuffledStudents.slice(startIndex, startIndex + studentsPerPage);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center w-full">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`px-4 py-2 bg-black text-white mr-2 rounded-lg ${currentPage === 0 ? 'cursor-not-allowed' : ''}`}
        >
          &lt;
        </button>
        <div className="flex overflow-x-auto w-full justify-center">
          {currentStudents.map((student, index) => (
            <div key={index} className="relative flex flex-col group w-48 h-64 mx-2">
              {/* Profile image container */}
              <div
                className="w-full h-full rounded-md bg-gray-100 grayscale group-hover:grayscale-0 transition-all duration-300"
                style={{
                  backgroundImage: `url('${student.dp}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              
              {/* Name always displayed at the bottom */}
              <p
                className="absolute bottom-0 rounded-b-md left-0 right-0 bg-black bg-opacity-70 text-white text-center p-2 font-light"
                style={{ fontFamily: "'Roboto', 'Helvetica Neue', sans-serif", fontWeight: 400 }}
              >
                {student.name}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className={`px-4 py-2 bg-black text-white mr-2 rounded-md ${currentPage === totalPages - 1 ? 'bg-gray-400 cursor-not-allowed' : ''}`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

const AboutPage = () => {
  return (
    <div className="w-full flex flex-col items-start bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-black px-6 py-12 md:px-12 md:py-20">
      {/* About Section */}
      <motion.section
        className="flex flex-col items-start w-full transition-opacity duration-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex w-full">
          <div className="w-4/5 pr-8">
            <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">About</p>
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify text-gray-700">
              <em>Approaches to Kerala</em> is a digital compilation of the vibrant culture, history, and traditions of Kerala, South India. This website brings together multimedia content collected during ethnographic fieldwork as part of a J-term class offered by NYU Abu Dhabi. It offers a glimpse into the people, places, and practices that make Kerala unique.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify text-gray-700">
              From the intricate performances of Theyyam to the craftsmanship behind traditional dhows and the eco-conscious architecture that reflects Kerala’s harmony with nature, this platform showcases the diverse ways in which culture is preserved, practiced, and transformed. Through videos, photographs, audio recordings, and 360° media, we aim to present an immersive and thoughtful journey into Kerala’s multifaceted cultural heritage.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify text-gray-700">
              <em>Approaches to Kerala</em> invites you to explore this rich tapestry of culture and tradition and to engage with the voices, histories, and practices of Kerala.
            </p>
          </div>
          <div className="w-1/5 pl-8">
            <div className="text-left w-full mt-20">
              <Image src="/dp/professor.png" width={400} height={400} alt="Professor Samuel Mark Anderson" />
              <p className="text-lg md:text-sm" style={{ fontFamily: "'Roboto', 'Helvetica Neue', sans-serif" }}>
                Professor: <span className="font-bold">Samuel Mark Anderson</span>
              </p>
            </div>
          </div>
        </div>
        <hr className="my-8 border-t border-gray-300" />

        {/* Students Section */}
        <div className="w-full py-6">
          <StudentsGrid />
        </div>

        <hr className="my-8 border-t border-gray-300" />
      </motion.section>
    </div>
  );
}

export default AboutPage;