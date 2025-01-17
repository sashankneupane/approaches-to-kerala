"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { featured_photos } from '@/app/data';

function getPhotoPath(prevIdx: number) {
  const idx = (prevIdx + 1) % featured_photos.length;
  return `/photos/${featured_photos[idx]}.jpg`;
}

const FeaturedPhoto = () => {
  
    const [idx, setIdx] = useState(0);
    const [randomPhoto, setRandomPhoto] = useState(getPhotoPath(0));

  useEffect(() => {
    const interval = setInterval(() => {
        setRandomPhoto(getPhotoPath(idx));
        setIdx((prevIdx) => (prevIdx + 1) % featured_photos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [idx]);

  return (
    <Image src={randomPhoto} width={400} height={400} alt="Random Kerala Photo" className="rounded-lg" />
  );
};

export default FeaturedPhoto;
