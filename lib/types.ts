export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  points: string[];
  source: string;
  sourceUrl: string;
  publishedAt: string;
  category: Category;
  badge?: Badge;
}

export type Category = 'major' | 'tools' | 'business' | 'policy';

export type Badge = 'HOT' | 'NEW' | 'UPDATE' | 'IPO' | 'LEGAL' | 'CHIP' | 'FUNDING' | 'POLICY' | 'EU' | 'OPEN SOURCE';

export interface DailyNews {
  date: string;
  generatedAt: string;
  sources: string[];
  totalNews: number;
  categories: {
    major: number;
    tools: number;
    business: number;
    policy: number;
  };
  news: NewsItem[];
  summary: string[];
}

export interface NewsIndex {
  currentDate: string;
  lastUpdated: string;
  totalDays: number;
  recentDates: string[];
}

export const CATEGORY_CONFIG: Record<Category, { icon: string; title: string; titleEn: string }> = {
  major: { icon: '🔥', title: '重大公告', titleEn: 'Major Announcements' },
  tools: { icon: '🛠️', title: '工具与应用', titleEn: 'Tools & Applications' },
  business: { icon: '💰', title: '行业与商业', titleEn: 'Industry & Business' },
  policy: { icon: '🌍', title: '政策与伦理', titleEn: 'Policy & Ethics' },
};

export const BADGE_COLORS: Record<Badge, string> = {
  HOT: 'bg-red-500',
  NEW: 'bg-primary-500 text-black',
  UPDATE: 'bg-purple-600',
  IPO: 'bg-orange-500',
  LEGAL: 'bg-blue-600',
  CHIP: 'bg-emerald-600',
  FUNDING: 'bg-yellow-500 text-black',
  POLICY: 'bg-slate-600',
  EU: 'bg-indigo-600',
  'OPEN SOURCE': 'bg-green-600',
};
