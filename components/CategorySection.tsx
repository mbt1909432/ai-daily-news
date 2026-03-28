'use client';

import { NewsItem, CATEGORY_CONFIG, Category } from '@/lib/types';
import NewsCard from './NewsCard';

interface CategorySectionProps {
  category: Category;
  news: NewsItem[];
}

export default function CategorySection({ category, news }: CategorySectionProps) {
  const config = CATEGORY_CONFIG[category];

  if (news.length === 0) return null;

  // 第一条新闻作为 featured
  const featuredNews = news[0];
  const restNews = news.slice(1);

  return (
    <section className="mb-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 p-4 bg-white/5 rounded-xl">
        <span className="text-2xl">{config.icon}</span>
        <div>
          <h2 className="text-xl font-semibold text-white">{config.title}</h2>
          <p className="text-sm text-gray-500">{config.titleEn}</p>
        </div>
        <span className="ml-auto bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full text-sm">
          {news.length} 条
        </span>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredNews && (
          <NewsCard news={featuredNews} featured />
        )}
        {restNews.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </section>
  );
}
