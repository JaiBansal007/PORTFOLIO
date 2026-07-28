export interface Social {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

export interface Personal {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  resumeUrl: string;
  social: Social;
}

export interface About {
  bio: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
  gpa: string;
}

export interface Testimonial {
  name: string;
  title: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
  url: string;
}

export interface PortfolioData {
  personal: Personal;
  about: About;
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  testimonials: Testimonial[];
  blog: BlogPost[];
}
