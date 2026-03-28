'use client';

export default function Footer() {
  return (
    <footer className="text-center py-8 mt-12 border-t border-white/10">
      <p className="text-gray-500 text-sm mb-4">
        数据来源: TechCrunch · The Verge · VentureBeat · Reuters · MIT Technology Review
      </p>
      <p className="text-gray-600 text-xs">
        © {new Date().getFullYear()} AI News Daily · 每日更新
      </p>
    </footer>
  );
}
