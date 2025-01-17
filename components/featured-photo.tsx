import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { featured_photos } from '../app/data';

function getRandomPhoto() {
  const randomIndex = Math.floor(Math.random() * featured_photos.length);
  return `/photos/${featured_photos[randomIndex]}.jpg`;
}

const FeaturedPhoto = () => {
  const [randomPhoto, setRandomPhoto] = useState(getRandomPhoto());

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomPhoto(getRandomPhoto());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Image src={randomPhoto} width={400} height={400} alt="Random Kerala Photo" className="rounded-lg shadow-lg transition-all duration-500" />
  );
};

export default FeaturedPhoto;
