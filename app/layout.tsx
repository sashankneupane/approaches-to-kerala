import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Logo Overlay across all sites | Navigation to Home page */}
        <div className="fixed top-5 left-2 z-50 cursor-pointer">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Kerala Logo"
              width={100}
              height={40}
            />
          </Link>
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
