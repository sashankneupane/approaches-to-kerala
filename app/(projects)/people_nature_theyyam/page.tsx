"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

/**
 * Example images in /public/images
 * Adjust or replace with your actual image paths.
 */
const IMAGES = [];
for (let i = 1; i <= 26; i++) {
  IMAGES.push(`/images/photo${i}.jpeg`);
}

const TITLE = "PHOTO GALLERY".split("");

export default function PhotoGalleryPage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);

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
            <Link href="/projects/people_nature_theyyam/story">
              <button style={storyButtonStyle}>Story Mode</button>
            </Link>
          </div>
        </section>

        {/* Photo Gallery */}
        <section style={gallerySectionStyle}>
          <div style={galleryGridStyle}>
            {IMAGES.map((src, idx) => (
              <div style={galleryItemStyle} key={idx}>
                <img
                  src={src}
                  alt={`Gallery ${idx}`}
                  style={galleryImageStyle}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Keyframes for the pulsing animation */}
        <style jsx>{`
          @keyframes pulse {
            0% {
              text-shadow: 0 0 2px rgba(255,255,255,0.5);
            }
            100% {
              text-shadow: 0 0 15px rgba(255,255,255,1);
            }
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

const galleryGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "1rem",
};

const galleryItemStyle: React.CSSProperties = {
  borderRadius: "4px",
  overflow: "hidden",
};

const galleryImageStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
  objectFit: "cover",
};
