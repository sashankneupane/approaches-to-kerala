// 'use client';
// import React from "react";

// export default function Home() {
//   // Array of image data
//   const images = [
//     {
//       src: "/projects/chromatic-narrative-of-kerala/red.jpg",
//       alt: "Red and Gold in Hindu Temples",
//       caption: "Red and Gold in Hindu Temples",
//       description:
//         "Red is often associated with Shakti, the divine feminine principle, symbolizing power, passion, and auspiciousness. It is frequently used in temple decorations, particularly on walls and pillars. Gold represents prosperity, divinity, and illumination. It is often found in the adornments of deities and the architecture of temple sanctums.",
//     },
//     {
//       src: "/projects/chromatic-narrative-of-kerala/theyyam.jpg",
//       alt: "Vibrant Colors in Theyyam Performances",
//       caption: "Vibrant Colors in Theyyam Performances",
//       description:
//         "Theyyam costumes utilize a rich palette of colors, each with specific meanings: Red represents Bhadrakali, a fierce aspect of the goddess Durga, symbolizing power and protection. Yellow/ gold is associated with Vishnu, the preserver god, and signifies purity and knowledge.",
//     },
//     {
//       src: "/projects/chromatic-narrative-of-kerala/blue2.jpg",
//       alt: "Blue in Maritime Contexts",
//       caption: "Blue in Maritime Contexts",
//       description:
//         "The prevalence of blue in fishing villages and boat construction suggests a possible connection between blue and the seafaring tradition in Kerala. Blue might represent the vastness of the ocean, calmness during voyages, and faith placed in the sea for livelihood. Furthermore, in Hindu symbolism, blue is associated with bravery, masculinity, and the divine, qualities often attributed to those who venture out to sea.",
//     },
//     {
//       src: "/projects/chromatic-narrative-of-kerala/green1.jpg",
//       alt: "Green in Islamic Religion",
//       caption: "Green in Islamic Religion",
//       description:
//         "The prominent use of green in the architecture of past and present masjids in Kerala is an intentional choice, with more than aesthetic significance. Aside from green being a sacred color in Islam, often associated with paradise and tranquility, in Kerala, the Muslim party has a green flag, so it is a color that within the community has constantly been associated with the Islamic Religion.",
//     },
//   ];

//   return (
//     <div className="bg-gradient-to-b bg-black to-green-600 text-white min-h-screen">
//       {/* Top Section */}
//       <div className="flex flex-col items-center justify-center px-4 py-16 min-h-screen">
//         <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold tracking-wider mb-6 text-center">
//           The Chromatic Narrative of Kerala
//         </h1>
//         <div className="mt-4 w-16 h-1 bg-white mx-auto rounded"></div>
//         <p className="text-md md:text-lg lg:text-xl max-w-3xl text-center leading-relaxed mt-4">
//           This project delves into the significant role of color in shaping the cultural landscape of Kerala, India. Drawing upon ethnographic observations, interviews, and visual analysis, this project investigates how colors are semiotically employed across various domains, including architecture, dress, religion, and rituals in Kerala.
//         </p>
//       </div>

//       {/* Scrollable Section with Images */}
//       <div className="bg-white py-16 px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className="relative group shadow-lg overflow-hidden"
//               style={{ aspectRatio: "6/4" }}
//             >
//               <img
//                 src={image.src}
//                 alt={image.alt}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
//                 <p className="text-[100px] text-white text-lg font-bold mb-2"style={{ fontFamily: 'Impact' }}>
//                   {image.caption}
//                 </p>
//                 <p className="text-[20px] text-white text-sm text-center leading-snug">
//                   {image.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import React from "react";

export default function Home() {
  // Array of image data
  const images = [
    {
      src: "/projects/chromatic-narrative-of-kerala/red.jpg",
      alt: "Red and Gold in Hindu Temples:",
      caption: "Red and Gold in Hindu Temples:",
      description:
        "Red is often associated with Shakti, the divine feminine principle, symbolizing power, passion, and auspiciousness. It is frequently used in temple decorations, particularly on walls and pillars. Gold represents prosperity, divinity, and illumination. It is often found in the adornments of deities and the architecture of temple sanctums.",
    },
    {
      src: "/projects/chromatic-narrative-of-kerala/theyyam.jpg",
      alt: "Vibrant Colors in Theyyam Performances",
      caption: "Vibrant Colors in Theyyam Performances",
      description:
        "Theyyam costumes utilize a rich palette of colors, each with specific meanings: Red represents Bhadrakali, a fierce aspect of the goddess Durga, symbolizing power and protection. Yellow/ gold is associated with Vishnu, the preserver god, and signifies purity and knowledge.",
    },
    {
      src: "/projects/chromatic-narrative-of-kerala/blue1.jpg",
      alt: "Blue in Maritime Contexts",
      caption: "Blue in Maritime Contexts",
      description:
        "The prevalence of blue in fishing villages and boat construction suggests a possible connection between blue and the seafaring tradition in Kerala. Blue might represent the vastness of the ocean, calmness during voyages, and faith placed in the sea for livelihood. Furthermore, in Hindu symbolism, blue is associated with bravery, masculinity, and the divine, qualities often attributed to those who venture out to sea.",
    },
    {
      src: "/projects/chromatic-narrative-of-kerala/green1.jpg",
      alt: "Green in Islamic Religion",
      caption: "Green in Islamic Religion",
      description:
        "The prominent use of green in the architecture of past and present masjids in Kerala is an intentional choice, with more than aesthetic significance. Aside from green being a sacred color in Islam, often associated with paradise and tranquility, in Kerala, the Muslim party has a green flag, so it is a color that within the community has constantly been associated with the Islamic Religion.",
    },
  ];

  return (
    <div className="bg-gradient-to-b bg-black to-green-600 text-white min-h-screen">
      {/* Top Section */}
      <div className="flex flex-col items-center justify-center px-4 py-16 min-h-screen">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-wider mb-6 text-center max-w-3xl"style={{ fontFamily: 'Impact' }}>
          Chromatic Narrative of Kerala: Exploring the Semiotics of Color in “God’s Own Country”

        </h1>
        <div className="mt-4 w-16 h-1 bg-white mx-auto rounded"></div>
        <p className="text-md md:text-lg lg:text-xl max-w-3xl text-center leading-relaxed mt-6 mx-auto">
          This project delves into the significant role of color in shaping the cultural landscape of Kerala, India. Drawing upon ethnographic observations, interviews, and visual analysis, this project investigates how colors are semiotically employed across various domains, including architecture, dress, religion, and rituals in Kerala.
        </p>
      </div>

      {/* Scrollable Section with Images */}
      <div className="bg-white py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group rounded-lg shadow-lg overflow-hidden"
              style={{ aspectRatio: "6/4" }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
                <p className="text-[100px] text-white text-lg font-bold mb-2"style={{ fontFamily: 'Impact' }}>
                  {image.caption}
                </p>
                <p className="text-[19px] text-white text-sm text-center">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Text Description Section without Images */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 text-center" style={{ fontFamily: 'Impact' }}>
        More Colors
    </h2>
  <div className="flex gap-6">
    {/* White in Kerala Text Box */}
    <div className="flex-1 border-2 border-black p-6 bg-opacity-10 border-gray-700">
      <p className="text-md md:text-lg lg:text-xl text-gray-700 leading-relaxed ">
        <span className="font-bold">Black in Kerala:</span> Black is generally associated with negativity, sadness, and mourning. It is not typically worn during festive occasions and is often avoided in everyday wear; during funerals, it’s not necessarily the ‘dress code’, but a black flag would be raised.
      </p>
    </div>
    

    {/* Black in Kerala Text Box */}
    <div className="flex-1 border-2 border-black p-6 bg-opacity-10 border-gray-700">
      <p className="text-md md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
        <span className="font-bold">White in Kerala:</span> White is traditionally associated with purity, simplicity, and peace. It is often worn during auspicious occasions and is considered to be a color of ‘preciousness’.
      </p>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}

