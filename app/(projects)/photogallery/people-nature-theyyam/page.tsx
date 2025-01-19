"use client";
import React from "react";
import PhotoSeries from "@/components/photoseries";

// Gallery images array
const galleryImages = [];
for (let i = 1; i <= 62; i++) {
  galleryImages.push({
    src: `/photos/photogallery/people-nature-theyyam/gallery/${i}.jpg`,
    alt: `Photo ${i}`,
  });
}

export default function PeopleNatureTheyyamPage() {
  const heroImages = [
    "/photos/photogallery/people-nature-theyyam/gallery/2.jpg",
    "/photos/photogallery/people-nature-theyyam/gallery/5.jpg",
    "/photos/photogallery/people-nature-theyyam/gallery/39.jpg",
  ];

  return (
    <PhotoSeries 
      title="People, Nature, Theyyam"
      description="A visual journey through Kerala's culture, landscapes, and rituals"
      heroImages={heroImages}
      galleryImages={galleryImages}
      author={{
        name: "Yumi Omori",
        image: "/photos/photogallery/people-nature-theyyam/dp.jpg",
        bio: "Yumi Omori is a passionate photographer and explorer who captures the vibrant cultures and awe-inspiring landscapes of Kerala. Her lens reveals the heartbeat of local communities, weaving stories of rituals like Theyyam, and the harmonious coexistence between people and nature."
      }}
      storyLink="/photogallery/people-nature-theyyam/story"
    />
  );
}
