interface Student {
    name: string;
    dp: string;
    project: string;
  }
  
  interface Project {
    title: string;
    author: string;
    mode: string;
    link: string;
    description: string;
  }

  export type { Student, Project };