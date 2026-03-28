'use client';

import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DailyNews, Category, Badge } from '@/lib/types';

export default function WechatPage() {
  const [newsData, setNewsData] = useState<DailyNews | null>(null);
  const [exporting, setExporting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/data/latest.json')
      .then((res) => res.json())
      .then(setNewsData)
      .catch(console.error);
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const categoryConfig: Record<Category, { icon: string; title: string }> = {
    major: { icon: '🔥', title: '重大公告' },
    tools: { icon: '🛠️', title: '工具与应用' },
    business: { icon: '💰', title: '行业与商业' },
    policy: { icon: '🌍', title: '政策与伦理' },
  };

  const badgeColors: Record<Badge, string> = {
    HOT: 'background:#ef4444;color:#fff',
    NEW: 'background:#00d4ff;color:#000',
    UPDATE: 'background:#9333ea;color:#fff',
    IPO: 'background:#f97316;color:#fff',
    LEGAL: 'background:#2563eb;color:#fff',
    CHIP: 'background:#059669;color:#fff',
    FUNDING: 'background:#eab308;color:#000',
    POLICY: 'background:#475569;color:#fff',
    EU: 'background:#4f46e5;color:#fff',
    'OPEN SOURCE': 'background:#16a34a;color:#fff',
  };

  // 导出为长图
  const exportAsImage = async () => {
    if (!contentRef.current || !newsData) return;
    setExporting(true);

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `ai-news-${newsData.date}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Export image failed:', error);
      alert('导出图片失败，请重试');
    } finally {
      setExporting(false);
    }
  };

  // 导出为 PDF
  const exportAsPDF = async () => {
    if (!contentRef.current || !newsData) return;
    setExporting(true);

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // A4 宽度 210mm，根据图片比例计算高度
      const pdfWidth = 210;
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

      const pdf = new jsPDF({
        orientation: pdfHeight > 297 ? 'portrait' : 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`ai-news-${newsData.date}.pdf`);
    } catch (error) {
      console.error('Export PDF failed:', error);
      alert('导出PDF失败，请重试');
    } finally {
      setExporting(false);
    }
  };

  if (!newsData) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: '#1a1a2e', minHeight: '100vh', color: '#fff' }}>
        加载中...
      </div>
    );
  }

  // 按分类分组
  const newsByCategory: Record<Category, typeof newsData.news> = {
    major: [],
    tools: [],
    business: [],
    policy: [],
  };

  newsData.news.forEach((n) => {
    if (newsByCategory[n.category]) {
      newsByCategory[n.category].push(n);
    }
  });

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a2e' }}>
      {/* 顶部工具栏 */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          background: '#16213e',
          padding: '16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href="/"
            style={{
              color: '#00d4ff',
              textDecoration: 'none',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            ← 返回首页
          </a>
          <h1 style={{ color: '#fff', fontSize: '18px', margin: 0 }}>
            导出中心
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={exportAsImage}
            disabled={exporting}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: exporting ? 'wait' : 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              opacity: exporting ? 0.7 : 1,
            }}
          >
            {exporting ? '⏳ 生成中...' : '🖼️ 导出长图'}
          </button>
          <button
            onClick={exportAsPDF}
            disabled={exporting}
            style={{
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: exporting ? 'wait' : 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              opacity: exporting ? 0.7 : 1,
            }}
          >
            {exporting ? '⏳ 生成中...' : '📄 导出 PDF'}
          </button>
        </div>
      </div>

      {/* 使用说明 */}
      <div
        style={{
          background: 'rgba(0,212,255,0.1)',
          margin: '16px',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid rgba(0,212,255,0.3)',
        }}
      >
        <h3 style={{ color: '#00d4ff', margin: '0 0 12px 0', fontSize: '14px' }}>
          📝 导出说明
        </h3>
        <div style={{ color: '#aaa', fontSize: '13px' }}>
          <p style={{ margin: '0 0 8px 0' }}><strong>🖼️ 导出长图</strong>: 生成 PNG 图片，适合分享到微信群、朋友圈</p>
          <p style={{ margin: '0 0 8px 0' }}><strong>📄 导出 PDF</strong>: 生成 PDF 文件，适合保存归档或打印</p>
        </div>
      </div>

      {/* 预览区域 - 这部分会被导出 */}
      <div style={{ padding: '0 16px 32px' }}>
        <h2 style={{ color: '#888', fontSize: '14px', textAlign: 'center', margin: '0 0 16px 0' }}>
          📱 预览效果（点击导出按钮生成文件）
        </h2>
        <div
          style={{
            maxWidth: '375px',
            margin: '0 auto',
            background: '#fff',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        >
          {/* 手机顶部 */}
          <div
            style={{
              height: '44px',
              background: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid #e5e5e5',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '24px',
                background: '#333',
                borderRadius: '12px',
              }}
            />
          </div>
          {/* 内容区 - 导出目标 */}
          <div ref={contentRef}>
            <ContentHTML
              newsData={newsData}
              newsByCategory={newsByCategory}
              categoryConfig={categoryConfig}
              badgeColors={badgeColors}
              formatDate={formatDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 内容组件 - 用于导出
function ContentHTML({
  newsData,
  newsByCategory,
  categoryConfig,
  badgeColors,
  formatDate,
}: {
  newsData: DailyNews;
  newsByCategory: Record<Category, typeof newsData.news>;
  categoryConfig: Record<Category, { icon: string; title: string }>;
  badgeColors: Record<Badge, string>;
  formatDate: (date: string) => string;
}) {
  return (
    <div
      style={{
        padding: '20px 16px',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontSize: '15px',
        color: '#333',
        lineHeight: 1.8,
        background: '#fff',
      }}
    >
      {/* 标题 */}
      <h1
        style={{
          fontSize: '22px',
          fontWeight: 700,
          textAlign: 'center',
          margin: '0 0 8px 0',
          color: '#000',
        }}
      >
        🤖 今日 AI 最前沿
      </h1>
      <p style={{ fontSize: '13px', color: '#999', textAlign: 'center', margin: '0 0 20px 0' }}>
        {formatDate(newsData.date)} · {newsData.totalNews} 条新闻
      </p>

      {/* 今日要点 */}
      <section
        style={{
          background: 'linear-gradient(135deg, #e0f7ff, #f3e8ff)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 12px 0', color: '#000' }}>
          🎯 今日要点
        </h2>
        {newsData.summary.map((s, i) => (
          <p key={i} style={{ margin: '8px 0', fontSize: '14px', color: '#333' }}>
            <strong>{i + 1}.</strong> {s}
          </p>
        ))}
      </section>

      {/* 分类新闻 */}
      {(Object.entries(newsByCategory) as [Category, typeof newsData.news][])
        .filter(([_, news]) => news.length > 0)
        .map(([cat, news]) => (
          <section key={cat} style={{ marginBottom: '24px' }}>
            <h2
              style={{
                fontSize: '16px',
                fontWeight: 600,
                margin: '0 0 12px 0',
                paddingBottom: '8px',
                borderBottom: '2px solid #00d4ff',
              }}
            >
              {categoryConfig[cat].icon} {categoryConfig[cat].title}
            </h2>
            {news.map((n) => (
              <div
                key={n.id}
                style={{
                  marginBottom: '16px',
                  padding: '12px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                }}
              >
                {n.badge && (
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                      marginBottom: '8px',
                      ...(badgeColors[n.badge as Badge]
                        ? { background: badgeColors[n.badge as Badge].split(';')[0].split(':')[1], color: badgeColors[n.badge as Badge].split(';')[1].split(':')[1] }
                        : { background: '#666', color: '#fff' }),
                    }}
                  >
                    {n.badge}
                  </span>
                )}
                <h3
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    margin: n.badge ? '8px 0 8px 0' : '0 0 8px 0',
                    color: '#000',
                    lineHeight: 1.5,
                  }}
                >
                  {n.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0', lineHeight: 1.6 }}>
                  {n.summary}
                </p>
                {n.points.length > 0 && (
                  <ul style={{ margin: '8px 0', paddingLeft: '16px', fontSize: '13px', color: '#555' }}>
                    {n.points.map((p, i) => (
                      <li key={i} style={{ margin: '4px 0' }}>
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
                <p style={{ fontSize: '12px', color: '#999', margin: '8px 0 0 0' }}>📰 {n.source}</p>
              </div>
            ))}
          </section>
        ))}

      {/* 底部 */}
      <section
        style={{
          textAlign: 'center',
          paddingTop: '16px',
          borderTop: '1px solid #eee',
          marginTop: '24px',
        }}
      >
        <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>
          数据来源: TechCrunch · The Verge · VentureBeat · Reuters
        </p>
        <p style={{ fontSize: '11px', color: '#bbb', margin: '8px 0 0 0' }}>
          © AI News Daily · 每日更新
        </p>
      </section>
    </div>
  );
}
