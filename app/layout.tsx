import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Montserrat } from 'next/font/google';
import "./globals.css";
import { HomeIcon } from "@heroicons/react/24/outline";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: "Approaches to Kerala",
  description: "Tradition and Transition in Kerala | 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} ${montserrat.variable}`}>
      <head>
        {/* Remove the model-viewer script from here */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed top-5 left-5 z-50">
          <Link 
            href="/" 
            className="relative p-2.5 rounded-lg bg-neutral-100/80 hover:bg-white/90 
            transition-all duration-300 backdrop-blur-sm flex items-center justify-center
            hover:scale-110 hover:shadow-lg hover:text-neutral-900 group"
          >
            <HomeIcon className="w-4 h-4 text-neutral-600 group-hover:text-neutral-900 transition-colors" />
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
