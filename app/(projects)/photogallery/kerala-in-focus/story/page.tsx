"use client";
import React from "react";
import StoryViewer from "@/components/storyviewer";

const IMAGES: string[] = [];
for (let i = 0; i <= 26; i++) {
  IMAGES.push(`/photos/photogallery/kerala-in-focus/story/${i}.jpg`);
}

export default function Page() {
  return (
    <StoryViewer
      images={IMAGES}
      backgroundImage="/photos/photogallery/kerala-in-focus/gallery/1.jpg"
      title="Kerala in Focus"
      autoScrollInterval={4000}
      previousStoryHref="/kerala-in-focus/story"
      author={{
        name: "Timothy Chiu",
        portrait: "/dp/Timothy.jpg",
        description: "Timothy Chiu is a hobbyist street photographer that enjoys capturing the stories of everyday life in his travels. In Kerala, his photo project aims to record the intimate moments of people and activity and the rich colors and textures found everywhere in India.",
      }}
    />
  );
}