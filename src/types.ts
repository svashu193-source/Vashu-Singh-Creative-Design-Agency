export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'editing' | 'design' | 'content';
  iconName: string;
  deliverables: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: string;
  tags: string[];
  client: string;
  year: string;
  videoUrl?: string; // Opt for demonstration interactive modals
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface ContactFormState {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}
