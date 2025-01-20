'use client';
import Image from 'next/image';
import Hero from '@/components/hero';

export default function CapturingTheSpiritPage() {
  const images = ['/photos/covers/carlota.jpg'];
  const mainImage = '/photos/capturing-the-spirit/main.jpg';
  return (
    <div className="w-full">
      <Hero 
        images={images}
        title="Capturing the Spirit"
        description="A photographic journey through Kerala's cultural landscape"
        author="Carlota Suarez Rochard"
      />
        <Image
            src={mainImage}
            alt="Capturing the Spirit"
            layout="responsive"
            width={1920}
            height={1080}
        />
    </div>
  );
}