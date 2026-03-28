'use client';

import { NewsItem, BADGE_COLORS, Badge } from '@/lib/types';

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
}

// 来源图标配置
const SOURCE_ICONS: Record<string, string> = {
  'TechCrunch': '📰',
  'The Verge': '📰',
  'VentureBeat': '📰',
  'Reuters': '📡',
  'MIT Technology Review': '📚',
  'OpenAI': '🏢',
  'Google': '🏢',
  'Anthropic': '🏢',
  'Meta': '🏢',
  'Microsoft': '🏢',
  'Apple': '🏢',
  '机器之心': '🇨🇳',
  '量子位': '🇨🇳',
  'arXiv': '📄',
};

// 来源颜色配置
const SOURCE_COLORS: Record<string, string> = {
  'TechCrunch': '#0a9e0a',
  'The Verge': '#e5127d',
  'VentureBeat': '#117bb8',
  'Reuters': '#ff8000',
  'MIT Technology Review': '#000000',
  'OpenAI': '#10a37f',
  'Google': '#4285f4',
  'Anthropic': '#d4a574',
  'Meta': '#0668e1',
  'Microsoft': '#00a4ef',
  'Apple': '#555555',
  '机器之心': '#000000',
  '量子位': '#000000',
};

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) {
      return '刚刚';
    }
    if (diffHours < 24) {
      return `${diffHours}小时前`;
    }
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) {
      return `${diffDays}天前`;
    }
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  };

  const sourceIcon = SOURCE_ICONS[news.source] || '📰';
  const sourceColor = SOURCE_COLORS[news.source] || '#00d4ff';

  return (
    <article
      className={`
        bg-white/5 rounded-2xl p-6 border border-white/10
        transition-all duration-300 hover:translate-y-[-4px]
        hover:shadow-[0_10px_40px_rgba(0,212,255,0.15)] hover:border-primary-500/30
        ${featured ? 'md:col-span-2 lg:col-span-3' : ''}
      `}
    >
      {/* 顶部：来源 + Badge */}
      <div className="flex items-center justify-between mb-3">
        <a
          href={news.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
          style={{ color: sourceColor }}
        >
          <span>{sourceIcon}</span>
          <span className="font-medium">{news.source}</span>
        </a>
        {news.badge && (
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              BADGE_COLORS[news.badge as Badge] || 'bg-gray-600 text-white'
            }`}
          >
            {news.badge}
          </span>
        )}
      </div>

      {/* 标题 */}
      <h3 className="text-lg font-semibold text-white mb-3 leading-snug">
        {news.title}
      </h3>

      {/* 摘要 */}
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
        {news.summary}
      </p>

      {/* 要点 */}
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

      {/* 底部：时间 + 链接 */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-sm">
        <span className="text-gray-500">
          🕐 {formatTime(news.publishedAt)}
        </span>
        <a
          href={news.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1"
        >
          阅读原文
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </article>
  );
}
