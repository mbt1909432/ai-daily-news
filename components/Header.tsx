'use client';

import Link from 'next/link';

interface HeaderProps {
  date: string;
  totalNews: number;
  sources: string[];
}

export default function Header({ date, totalNews, sources }: HeaderProps) {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <header className="relative text-center py-12 mb-8 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10">
      {/* 导出按钮 */}
      <Link
        href="/wechat"
        className="absolute top-4 right-4 flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <span>📱</span>
        <span className="hidden sm:inline">公众号导出</span>
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        AI News Daily
      </h1>
      <p className="text-gray-400 text-lg mb-6">每日 AI 最前沿资讯</p>

      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
          <span>📅</span>
          <span className="text-primary-400">{formatDate(date)}</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
          <span>📰</span>
          <span className="text-primary-400">{totalNews} 条新闻</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
          <span>🌐</span>
          <span className="text-primary-400">{sources.length} 个来源</span>
        </div>
      </div>
    </header>
  );
}
