'use client';
import React from 'react';
import Hero from '@/components/hero';
import { motion } from 'framer-motion';

const EchoesAcrossTheIndianOcean = () => {
    return (
        <div className="min-h-screen w-full">
            <Hero 
                images={['/photos/echoes-across-the-indian-ocean/cover.jpg']}
                title="Echoes Across the Indian Ocean"
                description="This project explores the historical and cultural ties between the Gulf countries and India, with a focus on Kerala's longstanding relationship with the Arabian Peninsula."
                imageInterval={5000}
                author="Alia Almuhairi"
            />

            <div className="w-full px-4 py-24">
                {/* Project Description */}
                <motion.div 
                    className="w-3/4 mx-auto mb-24"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed tracking-wide space-y-6">
                        <span className="block mb-6">
                            This project explores the historical and cultural ties between the Gulf countries 
                            and India, with a focus on Kerala&apos;s longstanding relationship with the Arabian Peninsula.
                        </span>
                        <span className="block mb-6">
                            These connections were first established through the spice trade, which brought 
                            Arab traders to Kerala and facilitated centuries of exchange in goods, culture, 
                            and traditions.
                        </span>
                        <span className="block">
                            I have chosen to explore this through a collection of videos taken in Kerala, 
                            with each clip from Kerala followed by a corresponding shot from the UAE. 
                            I used the background sounds from both locations along with interviews to 
                            give context to the visuals.
                        </span>
                    </p>
                </motion.div>

                {/* Video Section */}
                <motion.div 
                    className="w-3/4 mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/pe9wB8AQy_I?rel=0&branding=0&showinfo=0&autohide=1&modestbranding=1&loop=1"
                            title="Echoes Across the Indian Ocean"
                            allow="accelerometer; autoplay; autoloop; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="mt-8">
                        <p className="text-gray-400 text-center italic text-lg">
                            &quot;A visual journey exploring the parallel narratives between Kerala and the UAE&quot;
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default EchoesAcrossTheIndianOcean;