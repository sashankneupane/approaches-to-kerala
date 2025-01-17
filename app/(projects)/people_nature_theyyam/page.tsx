"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

/**
 * Example images in /public/images
 * Adjust or replace with your actual image paths.
 */
const IMAGES: string[] = [];
for (let i = 1; i <= 26; i++) {
  IMAGES.push(`/images/photo${i}.jpeg`);
}

const TITLE = "PHOTO GALLERY".split("");

// Define size variations for grid items
const sizeClasses = [
  { cols: 1, rows: 1 }, // normal
  { cols: 2, rows: 1 }, // wide
  { cols: 1, rows: 2 }, // tall
  { cols: 2, rows: 2 }, // large
];

// Add this interface for our image objects
interface ImageItem {
  src: string;
  size: typeof sizeClasses[number];
}

const photoSeries = [
  {
    title: "People, Nature, Theyyam",
    description: "Explore the natural beauty of Kerala through a collection of landscape and wildlife photography.",
    coverImage: "/projects/people_nature_theyyam/cover1.jpg",
    slug: "people,nature,theyyams"
  },
  {
    title: "Kerala in Focus - 4 photo series",
    description: "Intimate portraits capturing the diverse faces and stories of Kerala's communities.",
    coverImage: "/projects/people_nature_theyyam/cover2.jpg",
    slug: "people-series"
  }
];

export default function PhotoGalleryPage() {
  // Modify the state to store image objects instead of just strings
  const [images, setImages] = useState<ImageItem[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Initialize randomized images on component mount
  useEffect(() => {
    const randomizedImages = IMAGES.map(src => ({
      src,
      // Assign random size with weighted probability (more normal sizes than large ones)
      size: sizeClasses[Math.floor(Math.random() * (
        Math.random() < 0.7 ? 1 : sizeClasses.length
      ))]
    }));
    
    // Shuffle the array
    const shuffled = [...randomizedImages]
      .sort(() => Math.random() - 0.5);
    
    setImages(shuffled);
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    function handleScroll() {
      const sy = window.scrollY;
      setScrollY(sy);

      // Pick which letter to highlight based on scroll
      // For example: every 100px we move to the next letter
      const newIndex = Math.floor(sy / 50) % TITLE.length;
      setActiveLetterIndex(newIndex);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * We’ll darken the background overlay up to 0.7 after 800px scroll.
   */
  const overlayOpacity = Math.min(scrollY / 800, 0.7).toFixed(2);

  /**
   * For the beaming/pulsing animation speed:
   * As scroll increases, animation duration decreases,
   * making the "pulse" faster. We clamp it so it doesn’t go below 0.3s.
   */
  const pulseDuration = Math.max(0.3, 1.2 - scrollY / 500);

  /**
   * For the beaming letter’s size:
   * Start at scale=1.0 near the top, up to scale=1.7 (for example).
   */
  const letterScale = 1 + Math.min(scrollY / 300, 0.7); // from 1.0 to 1.7

  // Update gallery grid style to use CSS grid
  const galleryGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem",
    gridAutoRows: "250px", // Base row height
  };

  // Update gallery item style to handle different sizes
  const getGalleryItemStyle = (size: typeof sizeClasses[number]): React.CSSProperties => ({
    ...galleryItemStyle,
    gridColumn: `span ${size.cols}`,
    gridRow: `span ${size.rows}`,
    opacity: 1, // You can still use your existing opacity calculation here
    height: "100%",
  });

  return (
    <>
      <Head>
        {/* Load a custom font (Major Mono Display) from Google Fonts */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div style={pageContainerStyle}>
        {/* Dark overlay that increases with scroll */}
        <div
          style={{
            ...backgroundOverlayStyle,
            backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
          }}
        />

        {/* Hero Section with Title */}
        <section style={heroSectionStyle}>
          <h1 style={{ ...titleStyle }}>
            {TITLE.map((letter, i) => {
              const isActive = i === activeLetterIndex;
              // If this letter is active, apply bigger scale + faster pulsing
              // We'll use inline style to set animationDuration dynamically
              return (
                <span
                  key={i}
                  style={{
                    color: isActive ? "#fff" : "#888",
                    transform: isActive ? `scale(${letterScale})` : "scale(1)",
                    textShadow: isActive ? "0 0 5px rgba(255,255,255,0.8)" : "none",
                    animation: isActive ? `pulse ${pulseDuration}s infinite alternate` : "none",
                    display: "inline-block", // so transform doesn’t affect neighbors
                    transition: "transform 0.3s, color 0.2s, text-shadow 0.3s",
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </h1>

          <div style={buttonsContainerStyle}>
            <Link href="/people_nature_theyyam/story">
              <button style={storyButtonStyle}>Story Mode</button>
            </Link>
          </div>
        </section>

        {/* Photo Gallery */}
        <section style={gallerySectionStyle}>
          <div style={galleryGridStyle}>
            {images.map((image, idx) => (
              <div 
                style={getGalleryItemStyle(image.size)} 
                key={idx}
                className="gallery-item"
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={`Gallery ${idx}`}
                  style={{
                    ...galleryImageStyle,
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Photo Series Covers Section */}
        <section style={seriesCoversSectionStyle}>
          <div style={seriesGridStyle}>
            {photoSeries.map((series) => (
              <Link 
                href={`/people_nature_theyyam/${series.slug}`} 
                key={series.title}
                style={coverContainerStyle}
              >
                <div style={coverImageContainerStyle}>
                  <img
                    src={series.coverImage}
                    alt={series.title}
                    style={coverImageStyle}
                  />
                  <div style={coverOverlayStyle}>
                    <h3 style={coverTitleStyle}>{series.title}</h3>
                    <p style={coverDescriptionStyle}>{series.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Full Screen Modal */}
        {selectedImage && (
          <div 
            style={modalOverlayStyle}
            onClick={() => setSelectedImage(null)}
          >
            <img 
              src={selectedImage} 
              alt="Full screen view"
              style={modalImageStyle}
            />
          </div>
        )}

        <style jsx>{`
          @keyframes pulse {
            0% {
              text-shadow: 0 0 2px rgba(255,255,255,0.5);
            }
            100% {
              text-shadow: 0 0 15px rgba(255,255,255,1);
            }
          }

          .gallery-item {
            transition: all 0.3s ease;
          }

          .gallery-item:hover {
            transform: scale(1.1);
            z-index: 10;
          }

          .gallery-item:hover ~ .gallery-item {
            transform: scale(0.85);
          }

          div[style*="coverImageContainerStyle"]:hover img {
            transform: scale(1.05);
          }

          div[style*="coverImageContainerStyle"]:hover div[style*="coverOverlayStyle"] {
            opacity: 1;
          }
        `}</style>
      </div>
    </>
  );
}

/* ------------------ STYLES ------------------ */

const pageContainerStyle: React.CSSProperties = {
  position: "relative",
  minHeight: "200vh", // enough room to scroll
  background: "url('/images/IMG_3429.jpg') no-repeat center center / cover",
  overflow: "hidden",
};

const backgroundOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 1,
};

const heroSectionStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 2,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const titleStyle: React.CSSProperties = {
  fontSize: "7rem",
  letterSpacing: "0.5rem",
  textTransform: "uppercase",
  marginBottom: "2rem",
  fontFamily: "'Major Mono Display', monospace", // Our new custom font
};

const buttonsContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
};

const storyButtonStyle: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  cursor: "pointer",
  border: "2px solid #fff",
  backgroundColor: "transparent",
  color: "#fff",
  borderRadius: "4px",
  transition: "background-color 0.3s",
  fontFamily: "inherit",
};

const gallerySectionStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 2,
  padding: "2rem",
  backgroundColor: "rgba(0,0,0,0.1)",
};

const galleryItemStyle: React.CSSProperties = {
  borderRadius: "4px",
  overflow: "hidden",
  cursor: "pointer",
  position: "relative",
  transition: "transform 0.3s ease-in-out",
};

const galleryImageStyle: React.CSSProperties = {
  display: "block",
  objectFit: "cover",
  width: "100%",
  height: "100%",
  transition: "transform 0.3s ease-in-out",
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  cursor: 'pointer'
};

const modalImageStyle: React.CSSProperties = {
  maxWidth: '90%',
  maxHeight: '90vh',
  objectFit: 'contain'
};

const seriesCoversSectionStyle: React.CSSProperties = {
  padding: "4rem 2rem",
  background: "#000",
};

const seriesGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "2rem",
  maxWidth: "1200px",
  margin: "0 auto",
};

const coverContainerStyle: React.CSSProperties = {
  position: "relative",
  cursor: "pointer",
  overflow: "hidden",
  aspectRatio: "16/9",
};

const coverImageContainerStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const coverImageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s ease-in-out",
};

const coverOverlayStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
};

const coverTitleStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "1rem",
  textAlign: "center",
};

const coverDescriptionStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: "1rem",
  textAlign: "center",
  lineHeight: 1.5,
};
