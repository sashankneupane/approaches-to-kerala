"use client";
import React, { useRef, useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const playfair = Playfair_Display({ subsets: ["latin"] });

/**
 * An example array of image paths (relative to /public).
 * Replace these with your actual images in /public/portfolio.
 */
const IMAGES: string[] = [];
for (let i = 0; i <= 26; i++) {
  IMAGES.push(`/projects/people-nature-theyyam/project2/${i}.jpg`);
}


// How often to auto-scroll to the next section (milliseconds)
const AUTO_SCROLL_INTERVAL = 4000;

// Split the title so each letter can animate individually
const TITLE = "Kerala in Focus".split("");

// The background behind the title
const titleBackgroundStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('/projects/people-nature-theyyam/IMG_3601.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  opacity: 1,
  transition: "opacity 0.5s ease-out",
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
    <div style={pageContainerStyle}>
      {/* Title / Hero Section */}
      <section style={heroSectionStyle}>
        <div
          style={{
            ...titleBackgroundStyle,
            opacity: Math.max(0, 1 - scrollY / 500), // Fade out as we scroll
          }}
        />
        <h1 style={titleStyle}>
          {TITLE.map((letter, i) => (
            <span key={i} style={getLetterStyle(i, scrollY)}>
              {letter}
            </span>
          ))}
        </h1>
        {/* Fixed position Next Story button */}
        <Link href="/people-nature-theyyam/story">
          <button style={nextStoryButtonStyle}>
            Previous Story
          </button>
        </Link>
      </section>

      {/* New Author / Description Section */}
      <section style={authorSectionStyle}>
        <div style={authorContainerStyle}>
          {/* Portrait */}
          <div style={portraitContainerStyle}>
            <Image
              src="/dp/Timothy.jpeg"
              alt="Author Portrait"
              width={300}
              height={300}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          {/* Description */}
          <div style={authorTextContainerStyle}>
            <h2 style={authorNameStyle}>By: Timothy Chiu</h2>
            <p style={authorDescriptionStyle}>
              Timothy Chiu is a hobbyist street photographer that enjoys capturing the stories of everyday life in his travels. In Kerala, his photo project aims to record the intimate moments of people and activity and the rich colors and textures found everywhere in India.
            </p>
          </div>
        </div>
      </section>

      {/* Scrolling Images */}
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
              objectFit: "cover",
            }}
          />
        </section>
      ))}

      {/* Add new centered Next Story button after all images */}
      <section style={centeredNextStorySectionStyle}>
        <Link href="/people-nature-theyyam/story">
          <button style={centeredNextStoryButtonStyle}>
            <span>Previous Story</span>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{ marginLeft: '8px' }}
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </Link>
        <Link href="/people-nature-theyyam">
          <button style={returnToGalleryButtonStyle}>
            <span>Return to Gallery</span>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{ marginLeft: '8px' }}
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        </Link>
      </section>

      <style jsx>{`
        .navigation-button {
          transition: all 0.3s ease;
        }
        .navigation-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
      `}</style>
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
 * - Active image: scale(1.0), opacity 1
 * - Inactive images: scale(0.2), opacity 0.3
 */
function getScaleStyle(index: number, activeIndex: number) {
  if (index === activeIndex) {
    return { transform: "scale(1.0)", opacity: 1 };
  }
  return { transform: "scale(0.2)", opacity: 0.3 };
}

// Hero Section
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

// Author / Description Section
const authorSectionStyle: React.CSSProperties = {
  minHeight: "70vh",
  background: "#f8f8f8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
};

const authorContainerStyle: React.CSSProperties = {
  maxWidth: "1000px",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: "2rem",
  alignItems: "center",
  justifyContent: "center",
};

const portraitContainerStyle: React.CSSProperties = {
  width: "300px",
  height: "300px",
  borderRadius: "50%",
  overflow: "hidden",
  flexShrink: 0,
};

const authorTextContainerStyle: React.CSSProperties = {
  flex: 1,
};

const authorNameStyle: React.CSSProperties = {
  fontSize: "2rem",
  marginBottom: "1rem",
  fontFamily: playfair.style.fontFamily,
};

const authorDescriptionStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  lineHeight: 1.6,
  color: "#333",
  fontFamily: playfair.style.fontFamily,
};

// Update the fixed Next Story button style
const nextStoryButtonStyle: React.CSSProperties = {
  position: 'fixed',
  top: '2rem',
  right: '2rem',
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  cursor: 'pointer',
  border: '2px solid rgba(255, 255, 255, 0.8)',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  color: '#fff',
  borderRadius: '30px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)',
  zIndex: 1000,
  fontFamily: playfair.style.fontFamily,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

// Add styles for the centered Next Story section and button
const centeredNextStorySectionStyle: React.CSSProperties = {
  minHeight: '50vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f8f8f8',
};

const centeredNextStoryButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem 2rem',
  fontSize: '1.2rem',
  cursor: 'pointer',
  border: '2px solid #333',
  backgroundColor: 'transparent',
  color: '#333',
  borderRadius: '40px',
  transition: 'all 0.3s ease',
  fontFamily: playfair.style.fontFamily,
  letterSpacing: '1px',
  textTransform: 'uppercase',
};
const returnToGalleryButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem 2rem',
  fontSize: '1.2rem',
  cursor: 'pointer',
  border: '2px solid #666',
  backgroundColor: 'transparent',
  color: '#666',
  borderRadius: '40px',
  transition: 'all 0.3s ease',
  fontFamily: playfair.style.fontFamily,
  letterSpacing: '1px',
  textTransform: 'uppercase',

};