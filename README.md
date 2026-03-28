# AI News Daily 🤖

> 每日 AI 最前沿资讯聚合平台

每日自动采集全球最前沿的 AI 新闻资讯，涵盖 OpenAI、Google、Anthropic、Meta 等最新动态。

## 🌟 特性

- 📰 **多源聚合**: TechCrunch、The Verge、VentureBeat、Reuters 等权威来源
- 🔄 **每日更新**: 自动采集最新 AI 资讯
- 📱 **响应式设计**: 支持桌面和移动端
- 🎨 **现代 UI**: 深色主题，卡片式布局
- ⚡ **静态部署**: Vercel 自动部署，全球 CDN 加速

## 📂 项目结构

```
ai-news-daily/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── layout.tsx         # 布局
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── NewsCard.tsx       # 新闻卡片
│   ├── CategorySection.tsx # 分类区块
│   ├── SummarySection.tsx  # 总结区块
│   ├── Header.tsx         # 页头
│   └── Footer.tsx         # 页脚
├── data/                  # 新闻数据 (JSON)
│   ├── index.json         # 索引
│   └── news/              # 按日期存储
│       └── 2026-03-28.json
├── lib/                   # 工具函数
│   ├── types.ts           # 类型定义
│   └── news.ts            # 数据读取
├── WORKFLOW.md            # 采集工作流程
└── README.md              # 本文档
```

## 🚀 快速开始

### 安装依赖

```bash
cd ai-news-daily
npm install
```

### 本地开发

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

## 📅 每日更新流程

### 1. 采集新闻

使用 Claude Code 执行：

```
"更新今日AI新闻"
```

### 2. 更新数据文件

Claude 会自动：
- 采集多个 AI 新闻源
- 过滤、分类、整理
- 更新 `/data/news/YYYY-MM-DD.json`
- 更新 `/data/index.json`

### 3. 提交到 Git

```bash
git add .
git commit -m "docs: update AI news for YYYY-MM-DD"
git push
```

### 4. 自动部署

Vercel 会自动检测 Git 推送并重新部署。

## 🔧 配置 Vercel 部署

1. 在 Vercel 导入 GitHub 仓库
2. Framework Preset: Next.js
3. Build Command: `npm run build`
4. Output Directory: `out`
5. 点击 Deploy

## 📊 数据格式

### news/YYYY-MM-DD.json

```json
{
  "date": "2026-03-28",
  "generatedAt": "2026-03-28T08:00:00Z",
  "sources": ["TechCrunch", "The Verge"],
  "totalNews": 15,
  "categories": {
    "major": 3,
    "tools": 6,
    "business": 3,
    "policy": 4
  },
  "news": [
    {
      "id": "20260328001",
      "title": "新闻标题",
      "summary": "摘要",
      "points": ["要点1", "要点2"],
      "source": "TechCrunch",
      "sourceUrl": "https://...",
      "publishedAt": "2026-03-27T09:00:00Z",
      "category": "major",
      "badge": "HOT"
    }
  ],
  "summary": ["要点1", "要点2", "要点3"]
}
```

## 📝 新闻分类

| 分类 | 说明 |
|------|------|
| 🔥 Major | 重大公告、产品发布、模型发布 |
| 🛠️ Tools | 新工具、开源项目、应用场景 |
| 💰 Business | 融资、并购、合作、市场分析 |
| 🌍 Policy | 监管、政策、伦理讨论 |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT
