import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI News Daily | 每日 AI 最前沿资讯',
  description: '每日采集全球最前沿的 AI 新闻资讯，涵盖 OpenAI、Google、Anthropic 等最新动态',
  keywords: ['AI', 'Artificial Intelligence', 'News', 'TechCrunch', 'OpenAI', 'Claude', 'Gemini'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
