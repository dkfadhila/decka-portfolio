export interface NavItem {
  id: string;
  label: string;
  path: string;
  num: string; // page index, e.g. "02"
}

export interface Stat {
  value: string;
  label: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface MethodCard {
  title: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  description: string;
  tags: string[];
}

export interface WorkItem {
  id: string;
  title: string;
  client: string;
  description: string;
  imageUrl: string;
  link?: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  link?: string;
  detailPath?: string;
  tags: string[];
  year: string;
  stack: string;
  status: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  stack: string[];
  imageUrl: string;
  overview: string;
  highlights: { label: string; value: string }[];
  sections: { heading: string; content: string[] }[];
  tags: string[];
}

export interface ContentItem {
  id: string;
  title: string;
  type: string; // Post / AMA / Space / Meetup
  date: string;
  description: string;
  link?: string;
}

export interface Social {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  fullName: string;
  label: string;
  capsLine: string;
  heroLines: string[];
  subtitle: string;
  intro: string[];
  aboutHeading: string[];
  avatar: string;
  profileImage: string;
  facts: Fact[];
  focusPills: string[];
  method: MethodCard[];
  selectedFacts: string[];
  capabilities: string[];
}

export interface PageMeta {
  num: string;
  kicker: string;
  title: string;
  lead: string;
}

export interface MapCard {
  id: string;
  num: string;
  title: string;
  description: string;
  path: string;
  type: 'A' | 'B' | 'C' | 'D'; // card archetype
  image?: string;
}
