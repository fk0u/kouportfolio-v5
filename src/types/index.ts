export interface Language {
  code: 'en' | 'id';
  name: string;
  flag: string;
}

export interface Theme {
  mode: 'light' | 'dark';
}

export interface NavItem {
  id: string;
  icon: string;
  label: { en: string; id: string };
  color: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  topics: string[];
}

export interface Achievement {
  title: { en: string; id: string };
  organization: { en: string; id: string };
  position: { en: string; id: string };
  date: string;
  level: { en: string; id: string };
}

export interface Certificate {
  id: string;
  title: { en: string; id: string };
  issuer: { en: string; id: string };
  date: string;
  pdfUrl?: string;
  imageUrl?: string;
}

export interface Experience {
  title: { en: string; id: string };
  company: { en: string; id: string };
  period: { en: string; id: string };
  description: { en: string; id: string };
}

export interface Education {
  school: { en: string; id: string };
  program: { en: string; id: string };
  period: { en: string; id: string };
  status: { en: string; id: string };
}

// GitHub API Types
export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  homepage?: string;
}