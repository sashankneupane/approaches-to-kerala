import React, { useRef, useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

// Add this utility function at the top
function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

interface AuthorInfo {
  name: string;
  portrait: string;
  description: string;
}

interface StoryViewerProps {
  images: string[];
  backgroundImage: string;
  title: string;
  autoScrollInterval?: number;
  author?: AuthorInfo;
  galleryLink: string;  // Changed from URL to string
}

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function StoryViewer({
  images,
  backgroundImage,
  title,
  autoScrollInterval = 4000,
  author,
  galleryLink,
}: StoryViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Refs to each section so we can scroll them into view
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Modified intersection observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-10% 0px",  // Adjust threshold area
      threshold: [0.3, 0.7],    // Multiple thresholds for smoother detection
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute("data-index"));
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setActiveIndex(index);
          // Cancel any pending auto-scroll when user manually scrolls
          if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
          }
        }
      });
    }, options);

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Improved scroll behavior
  const scrollToSection = (index: number) => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    const sectionEl = sectionRefs.current[index];
    if (sectionEl) {
      sectionEl.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      
      // Reset scrolling state after animation
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  // Modified auto-scroll effect
  useEffect(() => {
    if (isScrolling) return;

    scrollTimeout.current = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % images.length;
      scrollToSection(nextIndex);
    }, autoScrollInterval);

    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [activeIndex, isScrolling, images.length, autoScrollInterval, scrollToSection]);

  // Improved scroll handler
  useEffect(() => {
    const debouncedScroll = debounce(() => {
      const sy = window.scrollY;
      setScrollY(sy);
      
      const cycleSpeed = Math.max(50, 200 - sy / 10);
      const index = Math.floor(Date.now() / cycleSpeed) % title.length;
      setActiveLetterIndex(index);
    }, 16); // Debounce at 60fps

    window.addEventListener("scroll", debouncedScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      // Reset scroll position on unmount
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }, [title.length]);

  // Calculate styling for each letter of the title
  const getLetterStyle = (index: number, scrollY: number) => {
    const isActive = index === activeLetterIndex;
    const baseScale = 1;
    const maxScale = 2.0; // Increased max scale for more dramatic effect

    // Calculate scale based on scroll position
    const scrollScale = Math.min(1 + scrollY / 500, maxScale);

    // Calculate animation speed based on scroll
    const baseSpeed = 3000; // Base speed in milliseconds
    const minSpeed = 500; // Minimum speed (fastest)
    const speedFactor = Math.max(minSpeed, baseSpeed - scrollY);

    return {
      color: isActive ? "#fff" : "#888",
      textShadow: isActive
        ? `0 0 ${12 + scrollY / 50}px rgba(255,255,255,0.8)`
        : "none",
      transform: isActive ? `scale(${scrollScale})` : `scale(${baseScale})`,
      transition: `all ${speedFactor}ms ease-out`,
      display: "inline-block",
      fontFamily: playfair.style.fontFamily,
      fontSize: `${4 + scrollY / 200}rem`, // Dynamic font size
    };
  };

  return (
    <div className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory m-0 p-0">
      {/* Title / Hero Section */}
      <section className="min-h-screen bg-transparent text-white p-8 text-center relative overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 -z-10"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            opacity: Math.max(0, 1 - scrollY / 500),
          }}
        />
        <h1 className="text-6xl tracking-widest uppercase mb-8 flex justify-center gap-2">
          {title.split("").map((letter, i) => (
            <span key={i} style={getLetterStyle(i, scrollY)}>
              {letter}
            </span>
          ))}
        </h1>
        <Link href={galleryLink} passHref>
          <button className="fixed top-4 right-4 bg-black/40 hover:bg-black/60 rounded-full p-3 backdrop-blur-sm
                         border border-white/20 flex items-center gap-2 transition-all duration-300
                         hover:scale-105 active:scale-95 z-10">
            <span className="text-white/90 text-sm">Gallery</span>
            <svg 
              className="w-5 h-5 text-white/90" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12l6-6m-6 6l6 6" />
            </svg>
          </button>
        </Link>
      </section>

      {/* Author Section */}
      {author && (
        <section className="min-h-[70vh] bg-gray-50 flex items-center justify-center p-8">
          <div className="max-w-5xl w-full flex flex-row gap-8 items-center justify-center">
            <div className="w-[300px] h-[300px] rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={author.portrait}
                alt="Author Portrait"
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className={`text-4xl mb-4 ${playfair.className}`}>By: {author.name}</h2>
              <p className={`text-lg leading-relaxed text-gray-700 ${playfair.className}`}>
                {author.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Image Sections */}
      {images.map((src, i) => (
        <section
          key={i}
          ref={(el: HTMLDivElement | null) => {
            if (sectionRefs.current) {
              sectionRefs.current[i] = el;
            }
          }}
          data-index={i}
          className={`relative w-full h-screen flex items-center justify-center transition-colors duration-500 snap-start snap-always
            ${i === activeIndex ? 'bg-white/15' : ''}`}
        >
          <Image
            src={src}
            alt={`Photo ${i + 1}`}
            fill
            className={`object-cover transition-all duration-600 ease-out
              ${i === activeIndex ? 'scale-100 opacity-100' : 'scale-20 opacity-30'}`}
          />
        </section>
      ))}
    </div>
  );
}