interface Student {
    name: string;
    fullName: string;
    formalName: string;
    project: {
      title: string;
      slug: string;
      mode: string;
      description: string;
    }
  }

  export type { Student };