import type { Student, Project } from './types';

export const students: Student[] = [
  { name: 'Sashank', dp: 'laakhay.png', project: 'kerala-in-360' },
  { name: 'Bipana', dp: 'laakhay.png', project: 'potraits-of-kerala' },
  { name: 'Sungyun', dp: 'sungyun.png', project: 'kerala-in-360' },
  { name: 'Soyuj', dp: 'laakhay.png', project: 'colors-of-kerala' },
  { name: 'Alia', dp: 'alia.jpg', project: 'kerala-in-360' },
  { name: 'Carlota', dp: 'laakhay.png', project: 'kerala-in-360' },
  { name: 'Yumi', dp: 'laakhay.png', project: 'people-nature-theyyam' },
  { name: 'Timothy', dp: 'laakhay.png', project: 'kerala-in-360' },
  { name: 'Didi', dp: 'didi.png', project: 'kerala-in-360' },
  { name: 'Sayda', dp: 'laakhay.png', project: 'kerala-in-360' },
  { name: 'Shahad', dp: 'laakhay.png', project: 'kerala-in-360' },
  { name: 'Luca', dp: 'laakhay.png', project: 'kerala-in-360' },
  { name: 'Khater', dp: 'laakhay.png', project: 'kerala-in-360' },
  { name: 'Mustafa', dp: 'laakhay.png', project: 'kerala-in-360' },
  { name: 'Noor', dp: 'laakhay.png', project: 'kerala-in-360' },
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
    title: 'Potraits of Kerala', 
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
    title: 'People, Nature, Thayyam', 
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
];

export const featured_photos: string[] = [
  "boats", "kalari", "theyyam-preparation", "theyyam"
];