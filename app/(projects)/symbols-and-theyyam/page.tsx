'use client';
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Hero from "@/components/hero";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SymbolsAndTheyyam() {
  const photosDir = "/photos/symbols-and-theyyam";
  const theyyamVideos = [
    "https://www.youtube.com/embed/lROnAXKDUko",
    "https://www.youtube.com/embed/dVFR84Gvhk0"
  ];
  const lynchMemory = "https://www.youtube.com/embed/J1Ylguq1GLc";

  const photos = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Modified auto scroll effect with looping
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isAutoScrolling) return;

    let animationFrameId: number;
    let lastTime = 0;
    const scrollSpeed = 0.5;

    const animate = (currentTime: number) => {
      if (!lastTime) lastTime = currentTime;
      const delta = currentTime - lastTime;
      
      setScrollPosition(prev => {
        const newPosition = prev + scrollSpeed * (delta / 16);
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // Create seamless loop by resetting position when reaching end
        if (newPosition >= maxScroll) {
          // Jump back to start
          return 0;
        }
        return newPosition;
      });
      
      lastTime = currentTime;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Pause auto-scroll when user is interacting
    const handleInteraction = () => setIsAutoScrolling(false);
    const handleInteractionEnd = () => setIsAutoScrolling(true);

    container.addEventListener('mouseenter', handleInteraction);
    container.addEventListener('mouseleave', handleInteractionEnd);
    container.addEventListener('touchstart', handleInteraction);
    container.addEventListener('touchend', handleInteractionEnd);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      container.removeEventListener('mouseenter', handleInteraction);
      container.removeEventListener('mouseleave', handleInteractionEnd);
      container.removeEventListener('touchstart', handleInteraction);
      container.removeEventListener('touchend', handleInteractionEnd);
    };
  }, [isAutoScrolling]);

  // Update scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  return (
    <div ref={containerRef} className="bg-black relative">
      {/* Hero Section with Parallax */}
      <div className="h-screen relative overflow-hidden">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 300]) }}
          className="absolute inset-0"
        >
          <Hero 
            images={["/photos/bg/laterite.jpg"]}
            title="Symbols and Theyyam"
            description="This project explores the rich symbolism of the Theyyam ritual in Northern Kerala, weaving poetry, video, and reflections to capture its cultural and multisensory depth."
            author="Mustafa Diri"
          />
        </motion.div>
      </div>

      {/* Modified Gallery Section */}
      <section className="relative py-32 bg-black/90 backdrop-blur-sm">
        <div className="max-w-full mx-auto">
          {/* Opening Quote */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-3xl mx-auto px-6"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <p className="text-2xl font-light text-white/90 italic leading-relaxed">
                &quot;On the way, my eyes come across several hammer and sickle flags. I think of the red and I think of Theyyam. I think of Theyyam and I think of the red. It was the will of the people to choose the red, and it is the deities that embody a vivid red. I feel there&apos;s much to ponder here, (…).&quot;
              </p>
              <p className="text-white/70 mt-4 text-right">- Field Notes, Day 1</p>
            </div>
          </motion.div>

          {/* Gallery */}
          <div className="mb-16">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-scroll w-full gap-8 px-8 relative scrollbar-hide scroll-smooth"
            >
              {/* Double the images array for seamless looping */}
              {[...photos, ...photos].map((img, i) => (
                <motion.div
                  key={`${img}-${i}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative w-[500px] flex-shrink-0 aspect-[4/5]"
                >
                  <Image
                    src={`${photosDir}/symbols/${img}`}
                    fill
                    alt={`Theyyam Image ${i + 1}`}
                    className="object-cover rounded-lg"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Closing Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 max-w-3xl mx-auto px-6"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <p className="text-xl text-white/90 leading-relaxed">
                Theyyam, with its origins in lower caste communities, has historically served as a form of resistance against upper caste dominance. Moreover, the performative aspect of Theyyam, where lower caste individuals temporarily embody deities and receive reverence from upper castes, represents a reversal of traditional hierarchies.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PDF and Video Section */}
      <section className="relative py-32 bg-gradient-to-b from-black/90 to-black">
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* PDF Viewer */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] bg-zinc-900 rounded-xl overflow-hidden shadow-2xl"
            >
              <iframe
                src={`${photosDir}/drums thrummed.pdf#toolbar=0&view=FitH&zoom=FitH`}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </motion.div>

            {/* Videos */}
            <div className="space-y-8">
              {theyyamVideos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-2xl"
                >
                  <iframe
                    src={`${video}?autoplay=0&controls=1&showinfo=0&rel=0&modestbranding=1`}
                    className="w-full h-full"
                    title={`Theyyam Video ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="relative py-32 bg-black">
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Second PDF */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] bg-zinc-900 rounded-xl overflow-hidden shadow-2xl"
            >
              <iframe
                src={`${photosDir}/metal and flesh.pdf#toolbar=0&view=FitH&zoom=FitH`}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </motion.div>

            {/* Lynch Memory Video */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={`${lynchMemory}?autoplay=0&controls=1&showinfo=0&rel=0&modestbranding=1`}
                  className="w-full h-full"
                  title="Lynch Memory"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-white/60 text-sm text-center">
                In memory of David Lynch.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}