"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import lamps from "./data.json";

export default function Page() {
    const [selectedLamp, setSelectedLamp] = useState<number | null>(null);
    const [lampSizes, setLampSizes] = useState<{ id: number; size: { cols: number; rows: number } }[]>(
        []
    );

    // Precompute random sizes for each lamp
    useEffect(() => {
        const sizeClasses = [
            { cols: 1, rows: 1 }, // normal
            { cols: 2, rows: 1 }, // wide
            { cols: 1, rows: 2 }, // tall
            { cols: 2, rows: 2 }, // large
        ];
        const sizes = lamps.map((lamp) => ({
            id: Number(lamp.id), // Convert id to number
            size: sizeClasses[Math.floor(Math.random() * sizeClasses.length)],
        }));
        setLampSizes(sizes);
    }, []);

    // Gallery grid style
    const galleryGridStyle: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "0.5rem",
        gridAutoRows: "200px", // Base row height
    };

    // Gallery item style
    const getGalleryItemStyle = (size: { cols: number; rows: number }): React.CSSProperties => ({
        borderRadius: "4px",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transition: "transform 0.3s ease-in-out",
        gridColumn: `span ${size.cols}`,
        gridRow: `span ${size.rows}`,
        height: "100%",
    });

    // Render full-screen modal for the selected image
    const renderFullScreenModal = (lampId: number, description: string) => (
        <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
            onClick={() => setSelectedLamp(null)} // Close modal on clicking outside the image
        >
            <div
                className="relative max-w-4xl w-full mx-4 bg-white p-4 rounded"
                onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside the image
            >
                <button
                    onClick={() => setSelectedLamp(null)}
                    className="absolute top-4 right-4 text-black hover:text-white bg-gray-200 hover:bg-gray-800 rounded-full w-10 h-10 flex justify-center items-center z-50"
                >
                    ✕
                </button>
                <div className="flex justify-center items-center max-h-screen">
                    <Image
                        src={`/projects/lights-of-kerala/lamp${lampId}.png`}
                        alt={`Lamp${lampId}`}
                        width={500}
                        height={500}
                        layout="intrinsic" // Maintain original aspect ratio
                        className="object-contain max-h-full"
                    />
                </div>
                <p className="text-gray-800 text-center mt-4">{description}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen w-full scroll-hidden mb-8">
            <header className="relative w-full h-screen">
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(/projects/lights-of-kerala/cover.png)` }}
                >
                    <div className="h-full w-full bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            Lights of Kerala
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300">
                            A symbol of purity, divine presence and dispelling darkness.
                        </p>
                        <div className="mt-12 animate-bounce">
                            <span className="text-white text-2xl">↓ Scroll to explore</span>
                        </div>
                    </div>
                </div>
            </header>
            <main className="px-4 py-6">
                <div style={galleryGridStyle}>
                    {lampSizes.map(({ id, size }) => (
                        <div
                            key={`lamp${id}`}
                            style={getGalleryItemStyle(size)}
                            className="relative group"
                            onClick={() => setSelectedLamp(id)}
                        >
                            <Image
                                src={`/projects/lights-of-kerala/lamp${id}.png`}
                                alt={`Lamp${id}`}
                                fill
                                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center text-center p-2">
                                <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {lamps.find((lamp) => lamp.id === String(id))?.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* create a div that shows 3d model and original modal side by side */}

            </main>
            {/* Fullscreen modal for the selected image */}
            {selectedLamp !== null &&
                renderFullScreenModal(
                    selectedLamp,
                    lamps.find((lamp) => lamp.id === String(selectedLamp))?.description || ""
                )}
        </div>
    );
}