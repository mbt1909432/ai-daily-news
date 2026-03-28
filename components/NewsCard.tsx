'use client';

import { NewsItem, CATEGORY_CONFIG, BADGE_COLORS, Badge } from '@/lib/types';

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
}

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 24) {
      return `${diffHours}小时前`;
    }
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}天前`;
  };

  return (
    <article
      className={`
        bg-white/5 rounded-2xl p-6 border border-white/10
        transition-all duration-300 hover:translate-y-[-4px]
        hover:shadow-[0_10px_40px_rgba(0,212,255,0.15)] hover:border-primary-500/30
        ${featured ? 'md:col-span-2 lg:col-span-3' : ''}
      `}
    >
      {/* Badge */}
      {news.badge && (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
            BADGE_COLORS[news.badge as Badge] || 'bg-gray-600'
          }`}
        >
          {news.badge}
        </span>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-3 leading-snug">
        {news.title}
      </h3>

      {/* Summary */}
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
        {news.summary}
      </p>

      {/* Points */}
      {news.points.length > 0 && (
        <ul className="mb-4 space-y-2">
          {news.points.map((point, index) => (
            <li
              key={index}
              className="text-gray-500 text-sm pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-primary-500"
            >
              {point}
            </li>
          ))}
        </ul>
      )}

      {/* Meta */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-primary-400">{news.source}</span>
          <span>·</span>
          <span>{formatTime(news.publishedAt)}</span>
        </div>
        <a
          href={news.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-400 hover:text-primary-300 transition-colors"
        >
          查看详情 →
        </a>
      </div>
    </article>
  );
}
