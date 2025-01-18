"use client";
import React, { useRef, useState, useEffect } from "react";
import { Playfair_Display } from 'next/font/google';
import Image from 'next/image';

const playfair = Playfair_Display({ subsets: ['latin'] });

/**
 * An example array of image paths (relative to /public).
 * Replace these with your actual images in /public/portfolio.
 */
const IMAGES = [
  "/projects/people-nature-theyyam/photo1.jpeg",
  "/projects/people-nature-theyyam/photo2.jpeg",
  "/projects/people-nature-theyyam/photo3.jpeg",
  "/projects/people-nature-theyyam/photo4.jpeg",
  "/projects/people-nature-theyyam/photo5.jpeg",
  "/projects/people-nature-theyyam/photo6.jpeg",
  "/projects/people-nature-theyyam/photo7.jpeg",
  "/projects/people-nature-theyyam/photo8.jpeg",
  "/projects/people-nature-theyyam/photo9.jpeg",
  "/projects/people-nature-theyyam/photo10.jpeg",
  "/projects/people-nature-theyyam/photo11.jpeg",
  "/projects/people-nature-theyyam/photo12.jpeg",
  "/projects/people-nature-theyyam/photo13.jpeg",
  "/projects/people-nature-theyyam/photo14.jpeg",
  "/projects/people-nature-theyyam/photo15.jpeg",
  "/projects/people-nature-theyyam/photo16.jpeg",
  "/projects/people-nature-theyyam/photo17.jpeg",
  "/projects/people-nature-theyyam/photo18.jpeg",
  "/projects/people-nature-theyyam/photo19.jpeg",
  "/projects/people-nature-theyyam/photo20.jpeg",
  "/projects/people-nature-theyyam/photo21.jpeg",
  "/projects/people-nature-theyyam/photo22.jpeg",
  "/projects/people-nature-theyyam/photo23.jpeg",
  "/projects/people-nature-theyyam/photo24.jpeg",
  "/projects/people-nature-theyyam/photo25.jpeg",
  "/projects/people-nature-theyyam/photo26.jpeg",
];

// How often to auto-scroll to the next section (milliseconds)
const AUTO_SCROLL_INTERVAL = 4000;

// Split the title so each letter can animate individually
const TITLE = "PHOTO GALLERY".split("");

// Add this new style constant
const titleBackgroundStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: "url('/projects/people-nature-theyyam/IMG_3601.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 1,
  transition: 'opacity 0.5s ease-out',
  zIndex: -1,
};

export default function AmazingScrollingGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);

  // Refs to each section so we can scroll them into view
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Use IntersectionObserver to detect which section is in view
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Consider "in view" if 50% is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute("data-index"));
        if (entry.isIntersecting) {
          setActiveIndex(index);
        }
      });
    }, options);

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Move to next index
      const nextIndex = (activeIndex + 1) % IMAGES.length;
      scrollToSection(nextIndex);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, [activeIndex]);

  // Programmatically scroll to a given section index
  const scrollToSection = (index: number) => {
    const sectionEl = sectionRefs.current[index];
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    function handleScroll() {
      const sy = window.scrollY;
      setScrollY(sy);
      
      // Faster letter cycling based on scroll position
      const cycleSpeed = Math.max(50, 200 - sy / 10); // Decrease cycle interval as we scroll
      const index = Math.floor(Date.now() / cycleSpeed) % TITLE.length;
      setActiveLetterIndex(index);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate scale based on scroll position
  const getLetterStyle = (index: number, scrollY: number) => {
    const isActive = index === activeLetterIndex;
    const baseScale = 1;
    const maxScale = 2.0; // Increased max scale for more dramatic effect
    
    // Calculate scale based on scroll position
    const scrollScale = Math.min(1 + (scrollY / 500), maxScale);
    
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
    <div style={pageContainerStyle}>
      <section style={heroSectionStyle}>
        <div 
          style={{
            ...titleBackgroundStyle,
            opacity: Math.max(0, 1 - scrollY / 500), // Fade out as we scroll
          }}
        />
        <h1 style={titleStyle}>
          {TITLE.map((letter, i) => (
            <span
              key={i}
              style={getLetterStyle(i, scrollY)}
            >
              {letter}
            </span>
          ))}
        </h1>
      </section>
      {IMAGES.map((src, i) => (
        <section
          key={i}
          ref={(el: HTMLDivElement | null) => {
            if (sectionRefs.current) {
              sectionRefs.current[i] = el;
            }
          }}
          data-index={i}
          style={{
            ...sectionStyle,
            ...(i === activeIndex ? activeSectionStyle : {}),
          }}
        >
          <Image
            src={src}
            alt={`Photo ${i + 1}`}
            fill
            style={{
              ...imageStyle,
              ...getScaleStyle(i, activeIndex),
              objectFit: 'cover',
            }}
          />
        </section>
      ))}
    </div>
  );
}
/* -------------- STYLES & HELPERS -------------- */

/**
 * Main container for the entire page. 
 * We also apply a custom scrollbar here.
 */
const pageContainerStyle: React.CSSProperties = {
  margin: 0,
  padding: 0,
  // Make the container "scrollable" for 100vh sections
  height: "100vh",
  overflowY: "scroll",

  /* We can’t do inline pseudo-styles, 
     but here is example CSS you’d place in a CSS file or a styled-jsx block:
     ::-webkit-scrollbar {
       width: 12px;  // bigger width for the scroll bar
     }
     ::-webkit-scrollbar-thumb {
       background: #888;
       border-radius: 6px;
     }
     ::-webkit-scrollbar-thumb:hover {
       background: #555;
     }
     ::-webkit-scrollbar-track {
       background: #eee;
     }
  */
};

/**
 * Each section is 100vh so you see one image per "screen."
 */
const sectionStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.5s ease-out",
};

const activeSectionStyle: React.CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.15)",
};

/**
 * Base style for each image 
 */
const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
};
/**
 * Give a big difference in scale:
 * - Active image: scale(1.2), opacity 1
 * - Inactive images: scale(0.4), opacity 0.3
 */
function getScaleStyle(index: number, activeIndex: number) {
  if (index === activeIndex) {
    return { transform: "scale(1.0)", opacity: 1 };
  }
  return { transform: "scale(0.2)", opacity: 0.3 };
}

const heroSectionStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  color: "#fff",
  padding: "2rem",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const titleStyle: React.CSSProperties = {
  fontSize: "4rem",
  letterSpacing: "0.5rem",
  textTransform: "uppercase",
  marginBottom: "2rem",
  display: "flex",
  justifyContent: "center",
  gap: "0.5rem",
};



