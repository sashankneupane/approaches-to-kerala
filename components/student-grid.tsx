"use client";
import React, { useState, useEffect } from 'react';

interface Student {
  name: string;
  dp: string;
}

interface StudentsGridProps {
  students: Student[];
}

const StudentsGrid: React.FC<StudentsGridProps> = ({ students }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const studentsPerPage = 6;
  const totalStudents = students.length;
  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * studentsPerPage;
  const currentStudents = students.slice(startIndex, startIndex + studentsPerPage);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center w-full">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`px-4 py-2 bg-white text-black mr-2 rounded-lg ${currentPage === 0 ? 'cursor-not-allowed' : ''}`}
        >
          &lt;
        </button>
        <div className="flex overflow-x-auto w-full justify-center">
          {currentStudents.map((student, index) => (
            <div key={index} className="relative cursor-pointer flex flex-col group w-56 h-72 mx-2">
              <div
                className="w-full h-full rounded-md bg-gray-100 grayscale group-hover:grayscale-0 transition-all duration-300"
                style={{
                  backgroundImage: `url('dp/${student.dp}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
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
          className={`px-4 py-2 bg-white text-black mr-2 rounded-md ${currentPage === totalPages - 1 ? 'bg-gray-400 cursor-not-allowed' : ''}`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default StudentsGrid;