import type { Student, Project } from './types';

export const students: Student[] = [
  { name: 'Sashank', dp: 'laakhay.png', project: 'kerala-in-360' },
  { name: 'Bipana', dp: 'laakhay.png', project: 'potraits-of-kerala' },
  { name: 'Sungyun', dp: 'sungyun.png', project: 'lights-of-kerala' },
  { name: 'Soyuj', dp: 'laakhay.png', project: 'colors-of-kerala' },
  { name: 'Alia', dp: 'alia.jpg', project: 'echoes-across-the-indian-ocean' },
  { name: 'Carlota', dp: 'carlota.jpg', project: 'capturing-the-spirit' },
  { name: 'Yumi', dp: 'laakhay.png', project: 'people-nature-theyyam' },
  { name: 'Timothy', dp: 'laakhay.png', project: '' },
  { name: 'Didi', dp: 'didi.png', project: 'chromatic-narrative-of-kerala' },
  { name: 'Sayda', dp: 'laakhay.png', project: 'legends-and-myths-of-kerala' },
  { name: 'Shahad', dp: 'laakhay.png', project: 'keralatography' },
  { name: 'Luca', dp: 'laakhay.png', project: '' },
  { name: 'Khater', dp: 'laakhay.png', project: '' },
  { name: 'Mustafa', dp: 'mustafa.jpg', project: 'symbols-and-theyyam' },
  { name: 'Noor', dp: 'laakhay.png', project: '' },
];

export const projects: Project[] = [
  { 
    title: 'Kerala in 360', 
    author: 'Sashank Neupane', 
    mode: 'video', 
    link: '/kerala-in-360',
    description: 'Performances are not just art and visual spectacle but they hold deeper culture signifance, heritage, and identity.'
  },
  { 
    title: 'Portraits of Kerala', 
    author: 'Bipana Bastola', 
    mode: 'photo',
    link: '/portraits-of-kerala',
    description: 'Potraits of Kerala'
  },
  { 
    title: 'Colors of Kerala', 
    author: 'Soyuj Jung Basnet', 
    mode: 'photo',
    link: '/colors-of-kerala',
    description: 'Colors of Kerala'
  },
  { 
    title: 'People, Nature, Theyyam', 
    author: 'Yumi Omori', 
    mode: 'photo',
    link: '/people-nature-theyyam',
    description: 'ok description.'
  },
  { 
    title: 'Chromatic Narrative of Kerala', 
    author: 'Dinobi Ibegbu', 
    mode: 'photo',
    link: '/chromatic-narrative-of-kerala',
    description: 'ok description.'
  },
  { 
    title: 'Keralatography', 
    author: 'Shahad Alsaqqaf', 
    mode: 'video',
    link: '/keralatography',
    description: 'ok description.'
  }, {
    title: 'Lights of Kerala',
    author: 'Sungyun Sohn',
    mode: 'form',
    link: '/lights-of-kerala',
    description: 'A symbol of purity, divine presence and dispelling darkness.'
  }, {
    title: 'Capturing the Spirit',
    author: 'Carlota Suarez Rochard',
    mode: 'form',
    link: '/capturing-the-spirit',
    description: 'In Capturing the Spirit, I explore how artistic depictions of Theyyam in crafts differ from the garments and makeup used by actual Theyyam performers, and what these differences reveal about cultural preservation and commodification.'
  }, {
    title: 'Echoes Across the Indian Ocean',
    author: 'Alia Almuhairi',
    mode: 'video',
    link: '/echoes-across-the-indian-ocean',
    description: "This project explores the historical and cultural ties between the Gulf countries and India, with a focus on Kerala’s longstanding relationship with the Arabian Peninsula. These connections were first established through the spice trade, which brought Arab traders to Kerala and facilitated centuries of exchange in goods, culture, and traditions. I have chosen to explore this through a collection of videos taken in Kerala, with each clip from Kerala followed by a corresponding shot from the UAE. I used the background sounds from both locations along with interviews to give context to the visuals."
  },
  {
    title: 'Symbols and Theyyam',
    author: 'Mustafa Diri',
    mode: 'form',
    link: '/symbols-and-theyyam',
    description: 'N/A'
  },
  {
    title: 'Legends and Myths of Kerala',
    author: 'Sayda Abusalih',
    mode: 'audio',
    link: '/legends-and-myths-of-kerala',
    description: 'N/A'
  },
];

export const featured_photos: string[] = [
  "boats", "kalari", "theyyam-preparation", "theyyam"
];