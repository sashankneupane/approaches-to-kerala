'use client';
import StoryViewer from '@/components/storyviewer';

// Configure image paths
const images: string[] = [];
for (let i = 1; i <= 26; i++) {
  images.push(`/photos/photogallery/people-nature-theyyam/story/${i}.jpg`);
}

export default function PhotoStoryPage() {
  return (
    <StoryViewer
      images={images}
      backgroundImage="/photos/photogallery/people-nature-theyyam/gallery/1.jpg"
      title="People,Nature,Theyyam"
      author={{
        name: "Yumi Omori",
        portrait: "/dp/yumi.jpg",
        description: "Yumi Omori is a passionate photographer and explorer who captures the vibrant cultures and awe-inspiring landscapes of Kerala. Her lens reveals the heartbeat of local communities, weaving stories of rituals like Theyyam, and the harmonious coexistence between people and nature."
      }}
      galleryLink="/photogallery/people-nature-theyyam"
    />
  );
}