import { getLatestNews } from '@/lib/news';
import Header from '@/components/Header';
import CategorySection from '@/components/CategorySection';
import SummarySection from '@/components/SummarySection';
import Footer from '@/components/Footer';
import { Category } from '@/lib/types';

export default function Home() {
  const newsData = getLatestNews();

  if (!newsData) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-white mb-4">AI News Daily</h1>
          <p className="text-gray-400">暂无新闻数据，请稍后再来</p>
        </div>
      </main>
    );
  }

  // 按分类分组新闻
  const newsByCategory: Record<Category, typeof newsData.news> = {
    major: [],
    tools: [],
    business: [],
    policy: [],
  };

  newsData.news.forEach((item) => {
    if (newsByCategory[item.category]) {
      newsByCategory[item.category].push(item);
    }
  });

  const categoryOrder: Category[] = ['major', 'tools', 'business', 'policy'];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Header
        date={newsData.date}
        totalNews={newsData.totalNews}
        sources={newsData.sources}
      />

      {/* 今日要点 */}
      <SummarySection summary={newsData.summary} />

      {/* 分类新闻 */}
      {categoryOrder.map((category) => (
        <CategorySection
          key={category}
          category={category}
          news={newsByCategory[category]}
        />
      ))}

      <Footer />
    </main>
  );
}
