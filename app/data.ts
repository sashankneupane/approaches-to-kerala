import type { Student } from './types';

export const students: Student[] = [
  { 
    name: 'Sashank',
    fullName: 'Sashank Neupane',
    project: {
      title: 'Kerala in 360',
      slug: 'kerala-in-360',
      mode: 'video',
      description: 'Performances are not just art and visual spectacle but they hold deeper culture signifance, heritage, and identity.'
    }
  },
  { 
    name: 'Bipana',
    fullName: 'Bipana Bastola',
    project: {
      title: 'Portraits of Kerala',
      slug: 'portraits-of-kerala',
      mode: 'photo',
      description: 'Portraits of Kerala'
    }
  },
  { 
    name: 'Sungyun',
    fullName: 'Sungyun Sohn',
    project: {
      title: 'Lights of Kerala',
      slug: 'lights-of-kerala',
        mode: 'form',
      description: 'A symbol of purity, divine presence and dispelling darkness.'
    }
  },
  { 
    name: 'Soyuj',
    fullName: 'Soyuj Jung Basnet',
    project: {
      title: 'Colors of Kerala',
      slug: 'colors-of-kerala',
        mode: 'photo',
      description: 'Experience the vibrant palette of Kerala through a collection of images that showcase the rich and diverse colors that define this beautiful region.'
    }
  },
  { 
    name: 'Alia',
    fullName: 'Alia Almuhairi',
    project: {
      title: 'Echoes Across the Indian Ocean',
      slug: 'echoes-across-the-indian-ocean',
      mode: 'video',
      description: "This project explores the historical and cultural ties between the Gulf countries and India, with a focus on Kerala's longstanding relationship with the Arabian Peninsula. These connections were first established through the spice trade, which brought Arab traders to Kerala and facilitated centuries of exchange in goods, culture, and traditions. I have chosen to explore this through a collection of videos taken in Kerala, with each clip from Kerala followed by a corresponding shot from the UAE. I used the background sounds from both locations along with interviews to give context to the visuals."
    }
  },
  { 
    name: 'Carlota',
    fullName: 'Carlota Suarez Rochard',
    project: {
      title: 'Capturing the Spirit',
      slug: 'capturing-the-spirit',
      mode: 'form',
      description: 'In Capturing the Spirit, I explore how artistic depictions of Theyyam in crafts differ from the garments and makeup used by actual Theyyam performers, and what these differences reveal about cultural preservation and commodification.'
    }
  },
  { 
    name: 'Yumi, Timothy',
    fullName: 'Yumi Omori, Timothy Chiu',
    project: {
      title: 'Photography Series in Kerala',
      slug: 'photogallery',
      mode: 'photo',
      description: 'Photography series in Kerala'
    }
  },
  { 
    name: 'Didi',
    fullName: 'Dinobi Ibegbu',
    project: {
      title: 'Chromatic Narrative of Kerala',
      slug: 'chromatic-narrative-of-kerala',
      mode: 'form',
      description: 'ok description.'
    }
  },
  { 
    name: 'Sayda',
    fullName: 'Sayda Abusalih',
    project: {
      title: 'Legends and Myths of Kerala',
      slug: 'legends-and-myths-of-kerala',
      mode: 'audio',
      description: 'Legends and Myths of Kerala'
    }
  },
  { 
    name: 'Shahad',
    fullName: 'Shahad Alsaqqaf',
    project: {
      title: 'Keralatography',
      slug: 'keralatography',
      mode: 'video',
      description: 'ok description.'
    }
  },
  { 
    name: 'Luka',
    fullName: 'Luka Salkovic',
    project: {
      title: 'Sounds and Sights of Everyday Kerala',
      slug: 'sounds-and-sights-of-everyday-kerala',
      mode: 'audio',
      description: "Mix of on-site recordings and photos that reflect Kerala’s culture."
    }
  },
  { 
    name: 'Khater',
    fullName: 'Khater Abdelrahman',
    featuredImg: 'khater.jpg',
    project: {
      title: 'Silhouettes of Kerala',
      slug: 'silhouettes-of-kerala',
      mode: 'photo',
      description: 'A creative exploration of Kerala’s rich heritage through captivating silhouettes and storytelling.'
    }
  },
  { 
    name: 'Mustafa',
    fullName: 'Mustafa Diri',
    project: {
      title: 'Symbols and Theyyam',
      slug: 'symbols-and-theyyam',
      mode: 'form',
      description: "This project explores the rich symbolism of the Theyyam ritual in Northern Kerala, weaving poetry, video, and reflections to capture its cultural and multisensory depth."
    }
  },
  { 
    name: 'Noor',
    fullName: 'Noor Haddad',
    project: {
      title: 'Scenes of Kerala',
      slug: 'scenes-of-kerala',
      mode: 'audio',
      description: 'A blend of audio recordings and images capturing the spirit of Kerala.'
    }
  },
];

export const featured_photos: string[] = [
  "boats", "kalari", "theyyam-preparation", "theyyam"
];