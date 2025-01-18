interface Student {
    name: string;
    fullName: string;
    featuredImg: string;
    project: {
      title: string;
      slug: string;
      mode: string;
      description: string;
      coverImg?: string
    }
  }

  export type { Student };