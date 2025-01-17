'use client';
import { ReactNode } from 'react';
import Link from 'next/link';

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 w-full z-10">
        <div className="backdrop-blur-md bg-black/30 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link 
              href="/" 
              className="text-lg font-medium hover:text-gray-400 transition-colors duration-300"
            >
              Approaches to Kerala
            </Link>
            <nav>
              <Link 
                href="/" 
                className="hover:text-gray-400 transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:transition-all hover:after:w-full"
              >
                Home
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="pt-20 pb-16">
        {children}
      </main>
    </div>
  );
}
