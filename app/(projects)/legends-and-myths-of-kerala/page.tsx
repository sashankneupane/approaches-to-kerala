'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function LegendsAndMyths() {
  const projectDirectory = "/photos/legends-and-myths-of-kerala/legends";
  const placeholderStories = [
    {
      paragraph: `In the humid twilight hours of Palakkad, Kerala, Odal emerges during twilight, when the sun sets on the horizon. According to local lore, this shapeshifting spirit chooses dusk as its hunting hour, believed to be when the boundaries between our world and the spirit realm are at their weakest.
The stories tell that Odal particularly seeks out pregnant women and vulnerable individuals walking alone at sunset. What makes this spirit especially feared is its reported ability to take different forms - appearing as a seemingly harmless old woman asking for directions, or manifesting as a distressed child crying for help.
Over generations, the people of Palakkad developed protective practices against this spirit: pregnant women and those considered vulnerable are taught to recite specific mantras for protection. In areas where Odal is said to roam, many local households maintain the tradition of placing neem leaves at their thresholds.`,
      image: `${projectDirectory}/story-1-odal.jpg`,
      caption: "This story was shared by Aarav and Kavya, siblings from Palakud in Kannur.",
      title: "The Twilight Spirit of Palakkad",
    },
    {
      paragraph: `<strong>Part 1: Irsha</strong><br />In the 7th century, along the Malabar Coast, King Cheraman Perumal ruled from his palace in Kodungallur. Known for his wisdom and philosophical nature, the king often spent nights studying the stars from his royal terrace. One night, he witnessed the moon appearing to split in two before reuniting in the sky.
Troubled by this vision, the king discussed it with Arab merchants who frequently visited his port city for the spice trade. The traders listened to the king's description of his vision, noting how it matched the Islamic miracle of the splitting of the moon (moon cleaving), a sign given to Prophet Muhammad in Mecca.
The merchants shared stories of the Prophet and his teachings, speaking of the unity of God and the principles of justice. The king, known for his spiritual inclinations, found himself drawn to these accounts. The connection between his vision and this miracle deeply affected him.
According to the folklore, Cheraman Perumal made a significant decision. He arranged for ships to be prepared, divided his kingdom into sections for governance in his absence, and sailed for Arabia. Upon reaching the Arabian Peninsula, he traveled to Mecca, where he met with Islamic scholars who explained the teachings of Islam. Cheraman Perumal then embraced Islam.
<strong>Part 2: Jiffri House</strong><br />The story tells that Cheraman spent several years in Mecca studying Islam. However, while planning his return to Kerala to share his faith, he fell ill. Sensing his end was near, he wrote letters to Kerala's rulers, entrusting them to his Arab companions. He requested them to help spread the message of Islam in his homeland with tolerance and respect for existing faiths.
These letters, carried back by Malik Ibn Dinar and his companions, led to the construction of Kerala's first mosques, including the Cheraman Juma Masjid in Kodungallur, traditionally considered India's first mosque. This oral tradition explains why many mosques in Kerala share architectural elements with Hindu temples.`,
      image: `${projectDirectory}/story-2-cheraman-perumal.jpg`,
      caption: `Part 1 of this story comes from Irsha in Kozhikode.<br />
Part 2 of this story was contributed by the residents of Jiffri House in Kozhikode.`,
      title: "The Moon's Miracle: Cheraman Perumal"
    },
    {
      paragraph: `In ancient Kerala, King Mahabali ruled as a wise and generous leader. Though he was an asura (demon king), his subjects deeply loved him for establishing a reign of justice and fairness. Under his rule, the kingdom knew no poverty or crime, and people lived together in perfect harmony.
Mahabali, despite being an asura, was a devoted follower of Lord Vishnu. His growing influence troubled the devas (gods), who feared their own power diminishing. In their concern, they sought Lord Vishnu's intervention to check Mahabali's expanding authority.
Lord Vishnu then appeared as Vamana, taking the form of a small Brahmin boy. He approached Mahabali during a yagna (ritual sacrifice). When Vamana requested a gift of three steps of land, Mahabali agreed without hesitation. Upon receiving the king's promise, Vamana transformed into a cosmic being. His first step encompassed the entire earth, and his second covered the heavens. When no space remained for the third step, Mahabali, recognizing Lord Vishnu's divine presence, humbly offered his own head.
Lord Vishnu, moved by Mahabali's devotion and selflessness, granted him a special blessing. Though sent to the netherworld, Mahabali was allowed to visit his beloved subjects once every year during Onam. This visit occurs on Thiruvonam day in the Malayalam month of Chingam.`,
      image: `${projectDirectory}/story-3-onam.jpg`,
      caption: "This story was recounted by Saleem in Sargaalaya",
      title: "King Mahabali's Return",
    },
    {
      paragraph: `Parashurama, the sixth avatar of Lord Vishnu who wielded the mighty axe (parashu), entered into a dispute with his parents. Overcome with remorse, he sought penance for his actions.
Standing atop what would later become the Western Ghats, Parashurama threw his battle axe far into the Arabian Sea in a moment of profound grief. As the divine weapon soared across the waters, the seas parted at its landing point. The waters receded, revealing a stretch of land extending from Gokarna (in modern-day Karnataka) to Kanyakumari (in Tamil Nadu). This newly emerged land became Kerala, also known as Parashurama Kshetram (the land of Parashurama).
This legend is often cited as the origin of Kerala's modern nickname "God's Own Country" - a land created through divine intervention. The Western Ghats, forming Kerala's eastern border, are said to mark the spot where Parashurama stood, and these mountains retain their ancient Sanskrit name Sahya Parvatham, forever linked to this mythological tale.`,
      image: `${projectDirectory}/story-4-the-birth-of-kerala.jpg`,
      caption: "This tale was shared by Jisha Kalyani in Kozhikode.",
      title: "The Birth of Kerala"
    },
  ];

  const [currentParagraphIndexes, setCurrentParagraphIndexes] = useState<number[]>(
    () => placeholderStories.map(() => 0)
  );

  const renderHTML = (content: string) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  const nextParagraph = (storyIndex: number) => {
    const paragraphs = placeholderStories[storyIndex].paragraph
      .split('\n')
      .filter((p) => p.trim().length > 0);
    setCurrentParagraphIndexes((prev) => {
      const updated = [...prev];
      if (updated[storyIndex] < paragraphs.length - 1) {
        updated[storyIndex]++;
      }
      return updated;
    });
  };

  const prevParagraph = (storyIndex: number) => {
    setCurrentParagraphIndexes((prev) => {
      const updated = [...prev];
      if (updated[storyIndex] > 0) {
        updated[storyIndex]--;
      }
      return updated;
    });
  };

  return (
    <div className="bg-black h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center flex items-center justify-center snap-start"
      style={{ backgroundImage: "url('/dp/sayda.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative text-center text-white px-6">
          <h1 className="text-[100px] font-bold mb-4" style={{ fontFamily: 'Impact' }}>Legends and Myths of Kerala</h1>
          <a
            href="#stories"
            className="mt-8 inline-block text-white border-2 border-white hover:bg-white hover:text-black font-bold py-3 px-6 transition-all"
          >
            Explore
          </a>
        </div>
      </section>

      {/* Stories Sections */}
      {placeholderStories.map((story, index) => {
        const paragraphsForThisStory = story.paragraph
          .split('\n')
          .filter((p) => p.trim().length > 0);

        const storyParagraphIndex = currentParagraphIndexes[index];
        const isFirstParagraph = storyParagraphIndex === 0;
        const isLastParagraph =
          storyParagraphIndex === paragraphsForThisStory.length - 1;

        return (
          <section
            key={index}
            className="h-screen snap-start flex flex-col items-center justify-center px-4 bg-black"
            style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
            id="stories"
          >
            <div className="w-full max-w-7xl mx-auto">
              <h2 className="text-5xl font-bold mb-16 text-center text-white">
                {story.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
                <div className="prose prose-lg prose-invert max-w-none">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={storyParagraphIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-gray-300 leading-relaxed text-lg min-h-[200px]"
                    >
                      {renderHTML(paragraphsForThisStory[storyParagraphIndex])}
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex flex-col items-center mt-8 gap-4">
                    <div className="flex gap-2">
                      {paragraphsForThisStory.map((_, i) => (
                        <button
                          key={i}
                          onClick={() =>
                            setCurrentParagraphIndexes((prev) => {
                              const updated = [...prev];
                              updated[index] = i;
                              return updated;
                            })
                          }
                          className={`h-1 transition-all duration-300 ${
                            i === storyParagraphIndex
                              ? 'w-8 bg-white'
                              : 'w-4 bg-gray-500 hover:bg-gray-400'
                          } rounded-sm`}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between w-full px-4">
                      <button
                        onClick={() => prevParagraph(index)}
                        className={`text-white text-3xl px-6 py-2 rounded-full hover:bg-white/10 transition-all ${
                          isFirstParagraph ? 'invisible' : ''
                        }`}
                        aria-label="Previous paragraph"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => nextParagraph(index)}
                        className={`text-white text-3xl px-6 py-2 rounded-full hover:bg-white/10 transition-all ${
                          isLastParagraph ? 'invisible' : ''
                        }`}
                        aria-label="Next paragraph"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Image
                    src={story.image}
                    alt={story.caption}
                    width={1200}
                    height={900}
                    className="rounded-lg shadow-2xl w-full object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="text-center text-xl italic text-gray-400 max-w-4xl mx-auto">
                {renderHTML(story.caption)}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}