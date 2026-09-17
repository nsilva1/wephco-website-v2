export interface IWaitlistEntry {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  unitType?: string;
  projectName?: string;
  createdAt?: Date | string;
  status?: string;
}

export interface IProjectHighlight {
  id: string;
  icon: string; // "Award", "Building2", "ShieldCheck", "TrendingUp", "Sparkles", "MapPin", "Clock", "CheckCircle2", "Lock"
  title: string;
  description: string;
}

export interface IProjectWaitlistConfig {
  title: string;
  titleHighlight: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  phaseBadge: string;
  locationBadge: string;
  targetYield: string;
  handover: string;
  allocation: string;
  projectName: string;
  highlights: IProjectHighlight[];
  unitCategories: string[];
  isFormOpen?: boolean;
  formTitle?: string;
  formSubtitle?: string;
  updatedAt?: Date | string;
}

export interface ProjectWaitlistProps {
  initialConfig?: IProjectWaitlistConfig;
}

export const DEFAULT_PROJECT_WAITLIST_CONFIG: IProjectWaitlistConfig = {
  title: 'The Canopies at',
  titleHighlight: 'Yas Point',
  subtitle:
    'Be among the privileged few to secure priority allocation in Abu Dhabi’s most anticipated waterfront luxury development before public release.',
  image: '/images/pdf-about/project_canopies_yas_point.png',
  imageAlt: 'The Canopies at Yas Point Development Showcase',
  phaseBadge: 'Pre-Launch Phase 1',
  locationBadge: 'Yas Island, Abu Dhabi',
  targetYield: '9.8% p.a.',
  handover: 'Q4 2027',
  allocation: '84% Reserved',
  projectName: 'The Canopies at Yas Point',
  highlights: [
    {
      id: 'h1',
      icon: 'Award',
      title: 'VIP Floor Choice',
      description: 'First selection rights on prime waterfront floors.',
    },
    {
      id: 'h2',
      icon: 'Building2',
      title: 'Zero Brokerage Fee',
      description: 'Exclusively waived for waitlist subscribers.',
    },
    {
      id: 'h3',
      icon: 'ShieldCheck',
      title: 'Guaranteed Buyback',
      description: 'Institutional capital protection terms included.',
    },
  ],
  unitCategories: [
    '1-2 Bedroom Luxury Suite',
    '3-4 Bedroom Penthouse Suite',
    'Waterfront Townhouse',
    'Whole Floor Commercial / Office',
  ],
  isFormOpen: true,
  formTitle: 'Join the VIP Waitlist',
  formSubtitle:
    'Receive confidential brochure, detailed floor plans, and pre-launch pricing directly to your inbox.',
};