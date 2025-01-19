import React, { useRef, useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

// Add this utility function at the top
function debounce<T extends (...args: any[]) => void>(
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
  nextStoryHref?: string;
  previousStoryHref?: string;
  author?: AuthorInfo;
}

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function StoryViewer({
  images,
  backgroundImage,
  title,
  autoScrollInterval = 4000,
  nextStoryHref,
  previousStoryHref,
  author,
}: StoryViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();

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
  }, [activeIndex, isScrolling, images.length, autoScrollInterval]);

  // Improved scroll handler
  useEffect(() => {
    const debouncedScroll = debounce((e: Event) => {
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

  // Update container style
  const pageContainerStyle: React.CSSProperties = {
    margin: 0,
    padding: 0,
    height: "100vh",
    overflowY: "scroll",
    scrollBehavior: "smooth",
    scrollSnapType: "y mandatory", // Add snap behavior
  };

  // Update section style
  const sectionStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.5s ease-out",
    scrollSnapAlign: "start", // Add snap alignment
    scrollSnapStop: "always", // Force snap points
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

  // Add this with the other style constants
  const titleBackgroundStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 1,
    transition: "opacity 0.5s ease-out",
    zIndex: -1,
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
    position: "fixed",
    top: "2rem",
    right: "2rem",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    cursor: "pointer",
    border: "2px solid rgba(255, 255, 255, 0.8)",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    color: "#fff",
    borderRadius: "30px",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    zIndex: 1000,
    fontFamily: playfair.style.fontFamily,
    letterSpacing: "1px",
    textTransform: "uppercase",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  // Add styles for the centered Next Story section and button
  const centeredNextStorySectionStyle: React.CSSProperties = {
    minHeight: "50vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8f8f8",
  };

  const centeredNextStoryButtonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem 2rem",
    fontSize: "1.2rem",
    cursor: "pointer",
    border: "2px solid #333",
    backgroundColor: "transparent",
    color: "#333",
    borderRadius: "40px",
    transition: "all 0.3s ease",
    fontFamily: playfair.style.fontFamily,
    letterSpacing: "1px",
    textTransform: "uppercase",
  };

  const returnToGalleryButtonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem 2rem",
    fontSize: "1.2rem",
    cursor: "pointer",
    border: "2px solid #666",
    backgroundColor: "transparent",
    color: "#666",
    borderRadius: "40px",
    transition: "all 0.3s ease",
    fontFamily: playfair.style.fontFamily,
    letterSpacing: "1px",
    textTransform: "uppercase",
  };

  return (
    <div style={pageContainerStyle}>
      {/* Title / Hero Section */}
      <section style={heroSectionStyle}>
        <div
          style={{
            ...titleBackgroundStyle,
            backgroundImage: `url(${backgroundImage})`,
            opacity: Math.max(0, 1 - scrollY / 500), // Fade out as we scroll
          }}
        />
        <h1 style={titleStyle}>
          {title.split("").map((letter, i) => (
            <span key={i} style={getLetterStyle(i, scrollY)}>
              {letter}
            </span>
          ))}
        </h1>
        {/* Fixed position Next Story button */}
        {nextStoryHref && (
          <Link href={nextStoryHref}>
            <button style={nextStoryButtonStyle}>Next Story</button>
          </Link>
        )}
        {previousStoryHref && (
          <Link href={previousStoryHref}>
            <button style={nextStoryButtonStyle}>Previous Story</button>
          </Link>
        )}
      </section>

      {/* New Author / Description Section */}
      {author && (
        <section style={authorSectionStyle}>
          <div style={authorContainerStyle}>
            {/* Portrait */}
            <div style={portraitContainerStyle}>
              <Image
                src={author.portrait}
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
              <h2 style={authorNameStyle}>By: {author.name}</h2>
              <p style={authorDescriptionStyle}>{author.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* Scrolling Images */}
      {images.map((src, i) => (
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
        {nextStoryHref && (
          <Link href={nextStoryHref}>
            <button style={centeredNextStoryButtonStyle}>
              <span>Next Story</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginLeft: "8px" }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        )}
        {previousStoryHref && (
          <Link href={previousStoryHref}>
            <button style={centeredNextStoryButtonStyle}>
              <span>Previous Story</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginLeft: "8px" }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        )}
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
              style={{ marginLeft: "8px" }}
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
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
  scrollBehavior: "smooth",
  scrollSnapType: "y mandatory", // Add snap behavior
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
  scrollSnapAlign: "start", // Add snap alignment
  scrollSnapStop: "always", // Force snap points
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

// Add this with the other style constants
const titleBackgroundStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  opacity: 1,
  transition: "opacity 0.5s ease-out",
  zIndex: -1,
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
  position: "fixed",
  top: "2rem",
  right: "2rem",
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  cursor: "pointer",
  border: "2px solid rgba(255, 255, 255, 0.8)",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  color: "#fff",
  borderRadius: "30px",
  transition: "all 0.3s ease",
  backdropFilter: "blur(10px)",
  zIndex: 1000,
  fontFamily: playfair.style.fontFamily,
  letterSpacing: "1px",
  textTransform: "uppercase",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

// Add styles for the centered Next Story section and button
const centeredNextStorySectionStyle: React.CSSProperties = {
  minHeight: "50vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8f8f8",
};

const centeredNextStoryButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem 2rem",
  fontSize: "1.2rem",
  cursor: "pointer",
  border: "2px solid #333",
  backgroundColor: "transparent",
  color: "#333",
  borderRadius: "40px",
  transition: "all 0.3s ease",
  fontFamily: playfair.style.fontFamily,
  letterSpacing: "1px",
  textTransform: "uppercase",
};

const returnToGalleryButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem 2rem",
  fontSize: "1.2rem",
  cursor: "pointer",
  border: "2px solid #666",
  backgroundColor: "transparent",
  color: "#666",
  borderRadius: "40px",
  transition: "all 0.3s ease",
  fontFamily: playfair.style.fontFamily,
  letterSpacing: "1px",
  textTransform: "uppercase",
};