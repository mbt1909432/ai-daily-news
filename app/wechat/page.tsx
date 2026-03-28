import { getLatestNews } from '@/lib/news';
import WechatClient from './WechatClient';

export default function WechatPage() {
  const newsData = getLatestNews();

  if (!newsData) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: '#1a1a2e', minHeight: '100vh', color: '#fff' }}>
        暂无新闻数据
      </div>
    );
  }

  return <WechatClient newsData={newsData} />;
}
