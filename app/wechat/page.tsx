import { getLatestNews } from '@/lib/news';

export default function WechatPage() {
  const newsData = getLatestNews();

  if (!newsData) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        暂无新闻数据
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const categoryConfig = {
    major: { icon: '🔥', title: '重大公告' },
    tools: { icon: '🛠️', title: '工具与应用' },
    business: { icon: '💰', title: '行业与商业' },
    policy: { icon: '🌍', title: '政策与伦理' },
  };

  const badgeColors: Record<string, string> = {
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

  // 按分类分组
  const newsByCategory = {
    major: newsData.news.filter(n => n.category === 'major'),
    tools: newsData.news.filter(n => n.category === 'tools'),
    business: newsData.news.filter(n => n.category === 'business'),
    policy: newsData.news.filter(n => n.category === 'policy'),
  };

  const wechatHTML = `
<section style="padding:20px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;color:#333;line-height:1.8;max-width:100%;">

  <!-- 标题 -->
  <h1 style="font-size:22px;font-weight:700;text-align:center;margin:0 0 8px 0;color:#000;">
    🤖 今日 AI 最前沿
  </h1>
  <p style="font-size:13px;color:#999;text-align:center;margin:0 0 20px 0;">
    ${formatDate(newsData.date)} · ${newsData.totalNews} 条新闻
  </p>

  <!-- 今日要点 -->
  <section style="background:linear-gradient(135deg,#e0f7ff,#f3e8ff);border-radius:12px;padding:16px;margin-bottom:24px;">
    <h2 style="font-size:16px;font-weight:600;margin:0 0 12px 0;color:#000;">🎯 今日要点</h2>
    ${newsData.summary.map((s, i) => `<p style="margin:8px 0;font-size:14px;color:#333;"><strong>${i + 1}.</strong> ${s}</p>`).join('')}
  </section>

  <!-- 分类新闻 -->
  ${Object.entries(newsByCategory)
    .filter(([_, news]) => news.length > 0)
    .map(([cat, news]) => `
  <section style="margin-bottom:24px;">
    <h2 style="font-size:16px;font-weight:600;margin:0 0 12px 0;padding-bottom:8px;border-bottom:2px solid #00d4ff;">
      ${categoryConfig[cat as keyof typeof categoryConfig].icon} ${categoryConfig[cat as keyof typeof categoryConfig].title}
    </h2>
    ${news
      .map(
        (n) => `
    <div style="margin-bottom:16px;padding:12px;background:#f8f9fa;border-radius:8px;">
      ${n.badge ? `<span style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;margin-bottom:8px;${badgeColors[n.badge] || 'background:#666;color:#fff'}">${n.badge}</span>` : ''}
      <h3 style="font-size:15px;font-weight:600;margin:${n.badge ? '8px' : '0'} 0 8px 0;color:#000;line-height:1.5;">
        ${n.title}
      </h3>
      <p style="font-size:14px;color:#666;margin:0 0 8px 0;line-height:1.6;">
        ${n.summary}
      </p>
      ${
        n.points.length > 0
          ? `<ul style="margin:8px 0;padding-left:16px;font-size:13px;color:#555;">
        ${n.points.map((p) => `<li style="margin:4px 0;">${p}</li>`).join('')}
      </ul>`
          : ''
      }
      <p style="font-size:12px;color:#999;margin:8px 0 0 0;">
        📰 ${n.source}
      </p>
    </div>
    `
      )
      .join('')}
  </section>
    `)
    .join('')}

  <!-- 底部 -->
  <section style="text-align:center;padding-top:16px;border-top:1px solid #eee;margin-top:24px;">
    <p style="font-size:12px;color:#999;margin:0;">
      数据来源: TechCrunch · The Verge · VentureBeat · Reuters
    </p>
    <p style="font-size:11px;color:#bbb;margin:8px 0 0 0;">
      © AI News Daily · 每日更新
    </p>
  </section>

</section>
  `;

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
        }}
      >
        <h1 style={{ color: '#fff', fontSize: '18px', margin: 0 }}>
          微信公众号导出
        </h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => {
              navigator.clipboard.writeText(wechatHTML);
              alert('HTML 已复制到剪贴板！\n\n直接粘贴到微信公众号编辑器即可');
            }}
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #7b2cbf)',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            📋 复制 HTML
          </button>
          <button
            onClick={() => {
              const blob = new Blob([wechatHTML], { type: 'text/html' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `ai-news-${newsData.date}.html`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            💾 下载 HTML
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
          📝 使用方法
        </h3>
        <ol style={{ color: '#aaa', fontSize: '13px', margin: 0, paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>点击「复制 HTML」按钮</li>
          <li style={{ marginBottom: '8px' }}>打开微信公众号后台编辑器</li>
          <li style={{ marginBottom: '8px' }}>直接 Ctrl+V 粘贴即可</li>
          <li>根据需要微调格式后发布</li>
        </ol>
      </div>

      {/* 预览区域 - 模拟手机 */}
      <div style={{ padding: '0 16px 32px' }}>
        <h2 style={{ color: '#666', fontSize: '14px', textAlign: 'center', margin: '0 0 16px 0' }}>
          📱 手机预览效果
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
          {/* 内容区 */}
          <div
            style={{
              height: '600px',
              overflow: 'auto',
            }}
            dangerouslySetInnerHTML={{ __html: wechatHTML }}
          />
        </div>
      </div>
    </div>
  );
}
