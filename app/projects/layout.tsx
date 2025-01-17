'use client';
import { ReactNode } from 'react';
import Link from 'next/link';

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <nav>
          <Link href="/" className="mr-4 hover:underline">Home</Link>
          <Link href="/projects/colors-of-kerala" className="hover:underline">
            Colors of Kerala
          </Link>
          {/* ...add links to other projects later... */}
        </nav>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2023 Kerala Project. All rights reserved.</p>
      </footer>
    </div>
  );
}
