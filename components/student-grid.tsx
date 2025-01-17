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
  const [studentsPerPage, setStudentsPerPage] = useState(6);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setStudentsPerPage(2);
      } else if (window.innerWidth < 768) {
        setStudentsPerPage(3);
      } else if (window.innerWidth < 1024) {
        setStudentsPerPage(4);
      } else {
        setStudentsPerPage(6);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isClient) {
    return null;
  }

  const totalStudents = students.length;
  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * studentsPerPage;
  const currentStudents = [
    ...students.slice(startIndex, startIndex + studentsPerPage),
    ...students.slice(0, Math.max(0, startIndex + studentsPerPage - totalStudents)),
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center w-full">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-white text-black mr-2 rounded-lg"
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
          className="px-4 py-2 bg-white text-black mr-2 rounded-md"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default StudentsGrid;