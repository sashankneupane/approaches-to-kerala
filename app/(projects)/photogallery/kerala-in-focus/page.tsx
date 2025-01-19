"use client";
import React from "react";
import PhotoSeries from "@/components/photoseries";

// Gallery images array
const galleryImages = [];
for (let i = 1; i <= 68; i++) {
  galleryImages.push({
    src: `/photos/photogallery/kerala-in-focus/gallery/${i}.jpg`,
    alt: `Photo ${i}`,
  });
}

export default function KeralaInFocusPage() {
  const heroImages = [
    "/photos/photogallery/kerala-in-focus/gallery/2.jpg",
    "/photos/photogallery/kerala-in-focus/gallery/5.jpg",
    "/photos/photogallery/kerala-in-focus/gallery/39.jpg",
  ];

  return (
    <PhotoSeries 
      title="Kerala in Focus"
      description="Intimate portraits and stories from the heart of Kerala"
      heroImages={heroImages}
      galleryImages={galleryImages}
      author={{
        name: "Timothy Chiu",
        image: "/photos/photogallery/kerala-in-focus/dp.jpg",
        bio: "Timothy Chiu is a hobbyist street photographer that enjoys capturing the stories of everyday life in his travels. In Kerala, his photo project aims to record the intimate moments of people and activity and the rich colors and textures found everywhere in India."
      }}
      storyLink="/photogallery/kerala-in-focus/story"
    />
  );
}
