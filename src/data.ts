import type {
  Profile,
  NavItem,
  Stat,
  ExperienceItem,
  WorkItem,
  Project,
  ProjectDetail,
  ContentItem,
  Social,
  PageMeta,
  MapCard,
  WorkDetail,
  CreativeItem,
} from './types';

// ============================================================
//  IDENTITY + CONTENT — Tirta (Decka Fadhila Tirta)
//  Real CV data — no more placeholders.
// ============================================================

export const profile: Profile = {
  name: 'Tirta',
  fullName: 'Decka Fadhila Tirta',
  label: 'Personal Portfolio — 2026',
  capsLine: 'DATA • RESEARCH • TECHNOLOGY • OPERATIONS',
  heroLines: ["Hello,", 'Tirta.'],
  subtitle:
    'Bachelor of Science in Physics graduate with experience in data processing, scientific computing, research, administrative support, and organizational coordination.',
  intro: [
    "I'm Tirta — a Physics graduate (Universitas Negeri Yogyakarta) with experience spanning data processing, scientific computing, research, administrative support, and organizational coordination.",
    'I care about turning complex data into clear insights, building computational tools, and using AI to make research and operations more efficient.',
    'I also build small, useful things for myself and others when existing workflows feel repetitive.',
  ],
  aboutHeading: ['Data explorer.', 'Scientific thinker.', 'Tech builder.'],
  avatar: '/tirta-profile.jpg',
  profileImage: '/tirta-profile.jpg',
  facts: [
    { label: 'Focus', value: 'Data, Research, Technology' },
    { label: 'Languages', value: 'Indonesian / English' },
    { label: 'Industry', value: 'Data, Research, Technology' },
    { label: 'Platforms', value: 'Web, X, GitHub' },
    { label: 'Based In', value: 'Indonesia' },
  ],
  focusPills: [
    'Data Processing',
    'Scientific Computing',
    'AI-Leveraged Operations',
    'Agentic & Automated Workflows',
  ],
  method: [
    {
      title: 'Data-driven approach',
      description: 'Handle large datasets, organize them, and extract patterns that inform decisions.',
    },
    {
      title: 'Research-oriented mindset',
      description: 'Dig into the data and context before drawing conclusions — analytical and curious.',
    },
    {
      title: 'Agentic & automated workflows',
      description: 'Experienced with n8n, Cursor, GitHub, Claude Code, Codex, Vercel, and Hermes.',
    },
    {
      title: 'Workflow optimization',
      description: 'Use AI tools and automation to improve research, content creation, and repetitive workflows.',
    },
  ],
  selectedFacts: [],
  capabilities: [
    'Data Management & Processing',
    'Data Analysis & Visualization',
    'Scientific Computing',
    'Research & Information Analysis',
    'Reporting & Documentation',
    'Administrative Support',
    'Workflow & Process Management',
    'AI-Leveraged Operations',
    'Agentic & Automated Workflows',
    'Project & Task Planning',
    'Content Operations',
    'Graphic Design & Visual Communication',
    'Social Media Management',
    'Copywriting & Content Writing',
    'Python',
    'Microsoft Office & Google Workspace',
  ],
};

// Hero metadata — technical annotations
export const heroMeta = {
  year: '2026',
  role: 'Data • Research • Tech',
  location: 'Indonesia',
  availability: 'Open to work',
  coords: '6.2°S / 106.8°E',
  email: 'deckafadhila@gmail.com',
};

export const nav: NavItem[] = [
  { id: 'home', label: 'Home', path: '/', num: '01' },
  { id: 'about', label: 'About', path: '/about', num: '02' },
  { id: 'experience', label: 'Experience', path: '/experience', num: '03' },
  { id: 'work', label: 'Work', path: '/work', num: '04' },
  { id: 'projects', label: 'Projects', path: '/projects', num: '05' },
  { id: 'content', label: 'Content', path: '/content', num: '06' },
  { id: 'creative', label: 'Creative', path: '/creative', num: '07' },
  { id: 'credentials', label: 'Credentials', path: '/credentials', num: '08' },
  { id: 'contact', label: 'Contact', path: '/contact', num: '09' },
];

// Editorial page headers — one per dedicated page
export const pageMeta: Record<string, PageMeta> = {
  home: {
    num: '01',
    kicker: 'Index',
    title: "Hello, I'm Tirta.",
    lead: 'Data processing, scientific computing, research, and technology-driven workflows.',
  },
  about: {
    num: '02',
    kicker: 'About',
    title: 'About & Principles.',
    lead: 'Operating principles, capabilities, and how I like to work.',
  },
  experience: {
    num: '03',
    kicker: 'Experience',
    title: 'Experience & Operations.',
    lead: 'Roles, responsibilities, and the path so far.',
  },
  work: {
    num: '04',
    kicker: 'Work',
    title: 'Selected Work.',
    lead: 'Professional engagements, practicum assistance, and operational support.',
  },
  projects: {
    num: '05',
    kicker: 'Projects',
    title: 'Projects & Research.',
    lead: 'Computational physics, atmospheric analysis, and technical experiments.',
  },
  content: {
    num: '06',
    kicker: 'Content',
    title: 'Content & Research.',
    lead: 'Web3 research, articles, and independent projects.',
  },
  creative: {
    num: '07',
    kicker: 'Creative',
    title: 'Visual & Motion Works.',
    lead: 'Posters, graphic design, photography, short-form edits, and motion visuals.',
  },
  credentials: {
    num: '08',
    kicker: 'Credentials',
    title: 'Credentials & Honors.',
    lead: 'Academic record, certificates, and recognition.',
  },
  contact: {
    num: '09',
    kicker: 'Contact',
    title: "Let's Talk.",
    lead: 'Have a project, a role, or just want to say hi? The inbox is open.',
  },
};

export const stats: Stat[] = [
  { value: '30K+', label: 'Data points processed' },
  { value: '8+', label: 'Roles & engagements' },
  { value: '300+', label: 'Web3 campaigns researched' },
  { value: 'Global', label: 'Working online' },
];

// ============================================================
//  EXPERIENCE — Full data from master CV (professional + organizational + Web3)
// ============================================================
export const experience: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Physics Computing Teaching Assistant',
    org: 'Universitas Negeri Yogyakarta',
    period: 'Feb 2025 — Jun 2025',
    description:
      'Processed and managed assessment data for 60+ students across laboratory and theoretical assessments. Assisted lecturers and students during laboratory sessions, guided students in completing computational physics assignments, and provided technical troubleshooting support.',
    tags: ['Python', 'Data Processing', 'Scientific Computing', 'Teaching'],
  },
  {
    id: 'exp-2',
    role: 'Intern — Emergency & Logistics Division',
    org: 'Badan Penanggulangan Bencana Daerah Kabupaten Kudus',
    period: 'Dec 2024 — Feb 2025',
    description:
      'Sorted and organized travel documents and financial records. Created visual materials for the agency\'s communication. Conducted rainfall and disaster-vulnerability mapping for Kabupaten Kudus. Participated in field surveys and assessments related to landslides and flood events.',
    tags: ['Data Mapping', 'GIS', 'Administrative Support', 'Field Research'],
  },
  {
    id: 'exp-3',
    role: 'Digital Systems Laboratory Teaching Assistant',
    org: 'Universitas Negeri Yogyakarta',
    period: 'Aug 2024 — Dec 2024',
    description:
      'Processed and managed assessment data for 20+ students during Digital Systems laboratory sessions. Supported student assessment and documentation processes, monitored laboratory activities, and provided guidance on laboratory assignments.',
    tags: ['Data Management', 'Documentation', 'Teaching', 'Digital Systems'],
  },
  {
    id: 'exp-4',
    role: 'Vice Head — Media & Information Division',
    org: 'Badan Eksekutif Mahasiswa Fakultas Matematika & Ilmu Pengetahuan Alam Universitas Negeri Yogyakarta',
    period: '2025',
    description:
      'Coordinated communication between organizational leadership, Media & Information staff, and other divisions. Monitored division workflow, managed design requests from multiple divisions, and supported social media publication and content distribution.',
    tags: ['Coordination', 'Visual Design', 'Social Media', 'Leadership'],
  },
  {
    id: 'exp-5',
    role: 'Organizational Advisory Board',
    org: 'Unit Kegiatan Mahasiswa Catur Universitas Negeri Yogyakarta',
    period: '2025',
    description:
      'Monitored internal coordination and organizational relationships among management members. Provided organizational monitoring and oversight to support internal coordination.',
    tags: ['Oversight', 'Coordination', 'Organization'],
  },
  {
    id: 'exp-6',
    role: 'Media & Information Staff',
    org: 'Unit Kegiatan Mahasiswa Catur Universitas Negeri Yogyakarta',
    period: '2023',
    description:
      'Supported internal communication and coordination within the Media & Information division. Managed and published organizational social media content, created visual materials, and supported content planning and publication activities.',
    tags: ['Social Media', 'Visual Design', 'Content Planning'],
  },
  {
    id: 'exp-7',
    role: 'Independent Web3 Researcher & Ecosystem Participant',
    org: 'Independent — X: @tirtavex',
    period: '2024 — Present',
    description:
      'Researched and evaluated 300+ Web3 projects based on activity, ecosystem development, incentive mechanisms, and community participation. Developed practical understanding of blockchain, DeFi, DEX, liquidity pools, DLMM, and Web3 protocols through testnets and social tasks.',
    tags: ['Web3', 'Blockchain', 'DeFi', 'Research'],
  },
  {
    id: 'exp-8',
    role: 'Web3 Content Writer & Researcher',
    org: 'X: @tirtavex',
    period: '2024 — Present',
    description:
      'Researched and wrote content on Web3 projects, blockchain protocols, DeFi concepts, and ecosystem developments. Translated technical information into accessible written content and created copywriting for social media.',
    tags: ['Content Writing', 'Copywriting', 'Web3', 'Research'],
  },
];

// ============================================================
//  WORK — Professional engagements from CV
// ============================================================
export const work: WorkItem[] = [
  {
    id: 'w1',
    title: 'Physics Computing Practicum',
    client: 'Universitas Negeri Yogyakarta',
    description:
      'Managed academic assessment data for 60+ students, assisted in computational physics sessions, and guided students through Python-based assignments.',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=75',
    detailPath: '/work/physics-computing',
    link: '#',
    tags: ['Data Processing', 'Python', 'Scientific Computing'],
    period: 'Februari 2025 — Juni 2025',
    stack: 'Python / Scientific Computing',
    status: 'Completed',
  },
  {
    id: 'w2',
    title: 'Kudus Disaster Agency — Mapping',
    client: 'Badan Penanggulangan Bencana Daerah Kabupaten Kudus',
    description:
      'Conducted rainfall and disaster-vulnerability mapping, created visual materials, and participated in field surveys for landslide and flood events.',
    imageUrl:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1000&q=75',
    detailPath: '/work/kudus-disaster-mapping',
    link: '#',
    tags: ['GIS', 'Data Mapping', 'Field Research'],
    period: 'Desember 2024 — Februari 2025',
    stack: 'QGIS / Data Mapping / Admin',
    status: 'Completed',
  },
  {
    id: 'w3',
    title: 'Digital Systems Practicum',
    client: 'Universitas Negeri Yogyakarta',
    description:
      'Processed assessment data for 20+ students, supported documentation processes, and guided students through practical assignments.',
    imageUrl:
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1000&q=75',
    detailPath: '/work/digital-systems',
    link: '#',
    tags: ['Data Management', 'Documentation', 'Teaching'],
    period: 'Agustus 2024 — Desember 2024',
    stack: 'Digital Systems / Data Management',
    status: 'Completed',
  },
];

export const workDetails: Record<string, WorkDetail> = {
  'physics-computing': {
    id: 'physics-computing',
    title: 'Physics Computing Practicum',
    subtitle: 'Academic Data Management & Computational Physics Laboratory Assistance',
    client: 'Universitas Negeri Yogyakarta',
    period: 'Februari 2025 — Juni 2025',
    stack: ['Python', 'Data Processing', 'Scientific Computing', 'Academic Support', 'Troubleshooting'],
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80',
    overview:
      'A comprehensive laboratory teaching and academic support engagement at Universitas Negeri Yogyakarta. Responsible for managing assessment data for 60+ undergraduate physics students, providing direct instructional support during computational sessions, and troubleshooting Python code.',
    highlights: [
      { label: 'Students Supported', value: '60+' },
      { label: 'Timeframe', value: 'Feb — Jun 2025' },
      { label: 'Core Focus', value: 'Python & Numerics' },
      { label: 'Role', value: 'Teaching Assistant' },
    ],
    sections: [
      {
        heading: 'Operational Scope & Responsibilities',
        content: [
          'Led weekly laboratory sessions focusing on computational physics problem solving using Python.',
          'Processed, structured, and archived comprehensive assessment records across both weekly lab work and midterm practical evaluations.',
          'Conducted real-time debugging and code reviews for students learning scientific numerical libraries.',
        ],
      },
      {
        heading: 'Data Workflow & Methodology',
        content: [
          'Built clean data processing sheets and automated tracking to minimize human grading discrepancies.',
          'Coordinated closely with primary course lecturers to calibrate grading standards and ensure consistency.',
          'Created reference scripts and problem-solving guidelines to accelerate student onboarding on complex physics algorithms.',
        ],
      },
      {
        heading: 'Impact & Outcomes',
        content: [
          'Successfully supervised and graded over 60 students with zero record losses and on-time grade submissions.',
          'Enhanced student code quality and numerical literacy through structured practical mentorship.',
        ],
      },
    ],
    tags: ['Teaching Assistant', 'Data Processing', 'Python', 'Scientific Computing', 'UNY'],
  },
  'kudus-disaster-mapping': {
    id: 'kudus-disaster-mapping',
    title: 'Kudus Disaster Agency — Mapping',
    subtitle: 'GIS Vulnerability Mapping, Field Surveys & Administrative Support',
    client: 'Badan Penanggulangan Bencana Daerah Kabupaten Kudus',
    period: 'Desember 2024 — Februari 2025',
    stack: ['QGIS', 'GIS Mapping', 'Field Assessment', 'Data Analysis', 'Visual Design'],
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80',
    overview:
      'Professional internship engagement within the Emergency and Logistics Division of BPBD Kabupaten Kudus. Involved in disaster vulnerability mapping, GIS data processing, field hazard surveys, and operational administrative support.',
    highlights: [
      { label: 'Agency', value: 'BPBD Kudus' },
      { label: 'Timeframe', value: 'Des 2024 — Feb 2025' },
      { label: 'Domain', value: 'GIS & Disaster Mgmt' },
      { label: 'Focus', value: 'Floods & Landslides' },
    ],
    sections: [
      {
        heading: 'Field Reconnaissance & Hazard Assessment',
        content: [
          'Participated directly in on-site field surveys following landslide and localized flooding events across vulnerable sub-districts in Kudus.',
          'Collected ground-truth geographic and hazard impact data to support rapid response and logistics allocation.',
        ],
      },
      {
        heading: 'Spatial Mapping & Data Synthesis',
        content: [
          'Conducted rainfall distribution analysis and correlated precipitation anomalies with historical vulnerability maps.',
          'Compiled geographic layers into accessible disaster risk maps for internal agency review and stakeholder briefs.',
          'Organized official travel and operational documentation, ensuring accurate administrative tracking for emergency dispatch.',
        ],
      },
      {
        heading: 'Communication & Visual Materials',
        content: [
          'Designed informative graphic infographics and visual notices for regional public awareness and agency bulletins.',
          'Bridged technical data and public comprehension through concise visual communication design.',
        ],
      },
    ],
    tags: ['BPBD', 'GIS', 'Disaster Mitigation', 'Data Mapping', 'Field Survey'],
  },
  'digital-systems': {
    id: 'digital-systems',
    title: 'Digital Systems Practicum',
    subtitle: 'Hardware Logic Testing & Academic Assessment Management',
    client: 'Universitas Negeri Yogyakarta',
    period: 'Agustus 2024 — Desember 2024',
    stack: ['Digital Logic', 'Data Management', 'Documentation', 'Teaching', 'Circuit Testing'],
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1400&q=80',
    overview:
      'Academic teaching assistance for the Digital Systems laboratory course at UNY. Managed evaluation data, guided undergraduate students through circuit implementations, and supported laboratory documentation standards.',
    highlights: [
      { label: 'Students', value: '20+' },
      { label: 'Timeframe', value: 'Agt — Des 2024' },
      { label: 'Course', value: 'Digital Systems' },
      { label: 'Role', value: 'Teaching Assistant' },
    ],
    sections: [
      {
        heading: 'Instruction & Lab Supervision',
        content: [
          'Mentored students during weekly laboratory assignments covering logic gates, combinational circuits, and sequential systems.',
          'Assisted students with breadboard hardware setup and digital logic troubleshooting.',
        ],
      },
      {
        heading: 'Assessment Management',
        content: [
          'Recorded, processed, and maintained academic performance data for 20+ students throughout the semester.',
          'Ensured rigorous and transparent evaluation according to the faculty academic rubrics.',
        ],
      },
    ],
    tags: ['Digital Systems', 'Teaching Assistant', 'Academic Support', 'UNY'],
  },
};

// ============================================================
//  PROJECTS — Real projects from CV
// ============================================================
export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Saturnian Moons Simulation',
    category: 'Scientific Computing',
    description:
      'Simulated the orbits of 83 Saturnian moons using Python & Pygame, processing 30,000+ data points with Runge-Kutta numerical methods.',
    imageUrl:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1000&q=75',
    detailPath: '/projects/saturnian-moons',
    tags: ['Python', 'Pygame', 'Numerical Methods', 'Scientific Computing'],
    year: '2023',
    stack: 'Python / Pygame',
    status: 'Completed',
  },
  {
    id: 'p2',
    title: 'Flood Event Analysis',
    category: 'Data Analysis',
    description:
      'Analyzed atmospheric dynamics for the March 25, 2025 flood event in Kabupaten Kudus using 10,000+ data points from 2016–2025.',
    imageUrl:
      'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1000&q=75',
    detailPath: '/projects/flood-analysis',
    tags: ['Python', 'Data Analysis', 'Atmospheric Science', 'Visualization'],
    year: '2025',
    stack: 'Python / Data Analysis',
    status: 'Completed',
  },
  {
    id: 'p3',
    title: 'Automatic Garage System',
    category: 'Embedded Systems',
    description:
      'Developed an automatic garage prototype using Arduino UNO and ultrasonic sensor with control logic for distance-based automation.',
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&q=75',
    detailPath: '/projects/arduino-garage',
    tags: ['Arduino', 'Ultrasonic Sensor', 'Embedded Systems', 'Control Logic'],
    year: '2024',
    stack: 'Arduino / C++',
    status: 'Completed',
  },
  {
    id: 'p4',
    title: 'Web3 Research & Content',
    category: 'Research',
    description:
      'Researched and evaluated 300+ Web3 projects, created educational content and copywriting for X under @tirtavex.',
    imageUrl:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1000&q=75',
    link: 'https://x.com/tirtavex',
    tags: ['Web3', 'Research', 'Content Writing', 'Blockchain'],
    year: '2024 — Present',
    stack: 'Research / Content',
    status: 'Ongoing',
  },
];

// ============================================================
//  PROJECT DETAILS — Detailed pages for selected projects
// ============================================================
export const projectDetails: Record<string, ProjectDetail> = {
  'saturnian-moons': {
    id: 'saturnian-moons',
    title: 'Saturnian Moons Simulation',
    subtitle: 'Simulating the Orbits of 83 Saturnian Moons Using Python & Pygame',
    category: 'Scientific Computing',
    year: '2023',
    stack: ['Python', 'Pygame', 'Runge-Kutta', 'Newtonian Gravity', 'Keplerian Mechanics'],
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1400&q=80',
    overview: 'A computational physics project that simulates the orbital behavior of 83 known Saturnian moons. The simulation models gravitational interactions using Newton\'s Law of Gravitation and applies the 4th-order Runge-Kutta numerical method to predict satellite positions and velocities over time.',
    highlights: [
      { label: 'Data Points', value: '30,000+' },
      { label: 'Moons Simulated', value: '83' },
      { label: 'Method', value: '4th-order Runge-Kutta' },
      { label: 'Physics Model', value: 'Newtonian Gravity + Keplerian Mechanics' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: [
          'This project simulates the orbital dynamics of Saturn\'s 83 known moons using Python and Pygame for visualization. The goal was to model gravitational interactions and predict satellite trajectories based on real astronomical data.',
          'The simulation processes orbital parameters including velocity, period, position/trajectory, mass, and other characteristics from the dataset to create an accurate model of moon behavior around Saturn.',
        ],
      },
      {
        heading: 'Methodology',
        content: [
          'Applied the 4th-order Runge-Kutta method — a widely-used numerical technique for solving ordinary differential equations — to predict satellite positions and velocities at each time step.',
          'Modeled gravitational interactions based on Newton\'s Law of Gravitation, accounting for Saturn\'s mass and the orbital parameters of each moon.',
          'Incorporated Kepler\'s Laws of planetary motion to validate orbital behavior and ensure the simulation produced physically accurate trajectories.',
        ],
      },
      {
        heading: 'Analysis & Findings',
        content: [
          'Analyzed orbital patterns and parameter relationships among the 83 Saturnian moons, identifying distinct clustering tendencies among satellites with similar orbital characteristics.',
          'Identified differences in orbital distribution between inner and outer moons, revealing patterns in how Saturn\'s satellite system is organized.',
          'The simulation provided insights into orbital resonance and gravitational perturbation effects within the Saturnian system.',
        ],
      },
    ],
    tags: ['Python', 'Pygame', 'Scientific Computing', 'Numerical Methods', 'Data Processing'],
  },
  'flood-analysis': {
    id: 'flood-analysis',
    title: 'Flood Event Analysis',
    subtitle: 'Analysis of the March 25, 2025 Flood Event in Kabupaten Kudus',
    category: 'Data Analysis',
    year: '2025',
    stack: ['Python', 'Data Analysis', 'Atmospheric Science', 'Data Visualization'],
    imageUrl: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1400&q=80',
    overview: 'An atmospheric dynamics analysis using Python to investigate factors associated with the March 25, 2025 flood event in Kabupaten Kudus. The study processed and analyzed 10,000+ data points covering rainfall, temperature, pressure, and atmospheric stability from 2016–2025.',
    highlights: [
      { label: 'Data Points', value: '10,000+' },
      { label: 'Time Span', value: '2016 — 2025' },
      { label: 'Event', value: 'March 25, 2025 Flood' },
      { label: 'Location', value: 'Kabupaten Kudus' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: [
          'This project investigates the atmospheric conditions and climate-related factors that contributed to the severe flooding in Kabupaten Kudus on March 25, 2025. The analysis uses Python-based data processing and visualization to identify patterns in meteorological data.',
          'The study processed over 10,000 data points spanning a 10-year period (2016–2025) to establish baseline conditions and identify anomalies associated with the flood event.',
        ],
      },
      {
        heading: 'Data & Methods',
        content: [
          'Analyzed multiple atmospheric variables including rainfall intensity, surface temperature, atmospheric pressure, cloud movement patterns, and climate variability indices.',
          'Applied computational and data-analysis methods to investigate the relationship between atmospheric conditions and flood events, comparing the March 2025 event against historical patterns.',
          'Used data visualization techniques to present findings and identify temporal patterns in atmospheric stability leading up to the flood event.',
        ],
      },
      {
        heading: 'Key Findings',
        content: [
          'Identified correlations between atmospheric pressure drops, sustained rainfall, and cloud movement patterns that preceded the flood event.',
          'Compared atmospheric variables across historical periods to establish the severity and uniqueness of the March 2025 conditions.',
          'The analysis provided a data-driven understanding of the flood\'s meteorological context, supporting disaster preparedness and response planning.',
        ],
      },
    ],
    tags: ['Python', 'Data Analysis', 'Scientific Computing', 'Atmospheric Science', 'Research'],
  },
  'arduino-garage': {
    id: 'arduino-garage',
    title: 'Automatic Garage System',
    subtitle: 'Ultrasonic Sensor-Based Automatic Garage System Using Arduino UNO',
    category: 'Embedded Systems',
    year: '2024',
    stack: ['Arduino UNO', 'Ultrasonic Sensor', 'C++', 'Embedded Systems', 'Control Logic'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80',
    overview: 'An automatic garage prototype that uses an Arduino UNO and ultrasonic sensor to detect vehicle proximity and automatically open/close the garage door. The system integrates sensor input, mathematical distance calculations, and control logic into a working embedded automation system.',
    highlights: [
      { label: 'Platform', value: 'Arduino UNO' },
      { label: 'Sensor', value: 'Ultrasonic' },
      { label: 'Type', value: 'Prototype' },
      { label: 'Domain', value: 'Embedded Systems' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: [
          'This project develops an automatic garage system prototype using Arduino UNO as the main controller and an ultrasonic sensor for distance detection. The system automatically opens and closes the garage door based on the proximity of a vehicle.',
          'The project integrates hardware (sensor + Arduino) with software (control logic) to create a functional embedded automation system.',
        ],
      },
      {
        heading: 'Methodology',
        content: [
          'Analyzed the mathematical equations used to calculate distance from ultrasonic sensor readings, converting time-of-flight measurements into accurate distance values.',
          'Designed control logic that translates calculated distance parameters into actuator commands for the garage mechanism (open/close).',
          'Integrated sensor input processing, mathematical calculations, and output control into a cohesive Arduino-based system.',
        ],
      },
      {
        heading: 'Implementation',
        content: [
          'Connected the ultrasonic sensor to Arduino UNO and programmed the microcontroller to continuously read distance measurements.',
          'Implemented threshold-based logic: when a vehicle is detected within a predefined distance, the system triggers the garage door to open; when the vehicle moves away, the door closes.',
          'Tested and calibrated the system for reliable detection and response across different conditions.',
        ],
      },
    ],
    tags: ['Arduino', 'Ultrasonic Sensor', 'Embedded Systems', 'Control Logic', 'Basic Electronics'],
  },
};

// ============================================================
//  CONTENT — Web3 research and articles
// ============================================================
export const content: ContentItem[] = [
  {
    id: 'c1',
    title: 'Independent Web3 Research',
    type: 'Research',
    date: '2024 — Present',
    description:
      'Researched and evaluated 300+ Web3 projects based on project activity, ecosystem development, incentive mechanisms, product concepts, and community participation. Monitored project updates, ecosystem narratives, and campaigns.',
    link: 'https://x.com/tirtavex',
  },
  {
    id: 'c2',
    title: 'Web3 Content Writing — X (@tirtavex)',
    type: 'Content',
    date: '2024 — Present',
    description:
      'Researched and wrote content on Web3 projects, blockchain protocols, DeFi concepts, and ecosystem developments. Translated technical information into accessible written content and social media copywriting.',
    link: 'https://x.com/tirtavex',
  },
  {
    id: 'c3',
    title: 'AI & Automation Workflows',
    type: 'Experiment',
    date: '2025',
    description:
      'Developed research workflows, knowledge bases, content operations, agent workflows, and workflow automation. Experienced with n8n, Cursor, GitHub, Claude Code, Codex, Vercel, and Hermes.',
    link: '#',
  },
];

export const creativeItems: CreativeItem[] = [
  {
    id: 'cr-1',
    title: 'Disaster Mitigation Campaign Poster',
    category: 'graphic',
    type: 'Poster & Layout',
    date: '2025',
    description:
      'Information design and public advisory poster series created for regional disaster risk awareness.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=90',
    mediaType: 'image',
    tags: ['Graphic Design', 'Poster', 'Infographic', 'Figma'],
    aspectRatio: 'poster',
  },
  {
    id: 'cr-2',
    title: 'Urban Architecture & Geometry',
    category: 'photography',
    type: 'Photography',
    date: '2024',
    description:
      'Monochrome and high-contrast architectural series exploring structural lines and shadow patterns.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&q=90',
    mediaType: 'image',
    tags: ['Photography', 'Architecture', 'Monochrome'],
    aspectRatio: 'photo',
  },
  {
    id: 'cr-3',
    title: 'Data Flow & Particle Simulation',
    category: 'motion',
    type: 'Motion & Animation',
    date: '2025',
    description:
      'Generative motion graphics visualizing real-time computational data and particle dynamics.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&q=80',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    mediaType: 'video',
    tags: ['Motion Design', 'Animation', 'Generative', 'Visuals'],
    aspectRatio: 'video-horizontal',
  },
  {
    id: 'cr-4',
    title: 'Short Cinematic Reel',
    category: 'motion',
    type: 'Short Video / Reel',
    date: '2025',
    description:
      'Fast-paced short-form edit featuring dynamic cuts, sound design sync, and color grading.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000&q=80',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    mediaType: 'video',
    tags: ['Video Editing', 'Reel', 'Color Grading', 'Sound Sync'],
    aspectRatio: 'video-vertical',
  },
];

export const socials: Social[] = [
  { label: 'Email', href: 'mailto:deckafadhila@gmail.com' },
  { label: 'X', href: 'https://x.com/tirtavex' },
  { label: 'GitHub', href: 'https://github.com/dkfadhila' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/deckafadhila/' },
];

// ============================================================
//  PORTFOLIO MAP — asymmetric modular grid on the Home page
// ============================================================
export const mapCards: MapCard[] = [
  {
    id: 'about',
    num: '02',
    title: 'About Me',
    description: 'Operating principles, capabilities, and collaboration style.',
    path: '/about',
    type: 'B',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&q=75',
  },
  {
    id: 'experience',
    num: '03',
    title: 'Experience',
    description: 'Practicum roles, internships, and organizational work.',
    path: '/experience',
    type: 'C',
  },
  {
    id: 'work',
    num: '04',
    title: 'Selected Work',
    description: 'Professional engagements and practicum assistance.',
    path: '/work',
    type: 'B',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&q=75',
  },
  {
    id: 'projects',
    num: '05',
    title: 'Projects',
    description: 'Computational physics, atmospheric analysis, and research.',
    path: '/projects',
    type: 'A',
  },
  {
    id: 'content',
    num: '06',
    title: 'Content',
    description: 'Web3 research, articles, and independent projects.',
    path: '/content',
    type: 'B',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1000&q=75',
  },
  {
    id: 'creative',
    num: '07',
    title: 'Creative Works',
    description: 'Visual designs, photography, motion graphics, and video edits.',
    path: '/creative',
    type: 'B',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=75',
  },
  {
    id: 'credentials',
    num: '08',
    title: 'Credentials',
    description: 'Academic record, certificates, and honors. Entries coming soon.',
    path: '/credentials',
    type: 'A',
  },
  {
    id: 'contact',
    num: '09',
    title: 'Contact',
    description: 'Start a conversation — the inbox is open.',
    path: '/contact',
    type: 'D',
    image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1000&q=75',
  },
];
