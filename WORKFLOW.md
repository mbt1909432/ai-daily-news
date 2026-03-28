# AI Daily News 工作流程

## 项目概述

这是一个自动化的 AI 新闻聚合项目，每日采集最前沿的 AI 资讯，并通过 Vercel 自动部署到线上。

---

## 信息搜集流程

### Phase 1: 信息采集 (Information Gathering)

#### 1.1 主要新闻源

| 来源 | 英文名 | URL | 类型 | 可信度 |
|------|--------|-----|------|--------|
| TechCrunch AI | TechCrunch | https://techcrunch.com/category/artificial-intelligence/ | 国际科技媒体 | ⭐⭐⭐⭐⭐ |
| The Verge AI | The Verge | https://www.theverge.com/ai-artificial-intelligence | 国际科技媒体 | ⭐⭐⭐⭐⭐ |
| VentureBeat AI | VentureBeat | https://venturebeat.com/category/ai/ | 企业AI焦点 | ⭐⭐⭐⭐ |
| Reuters AI | Reuters | https://www.reuters.com/technology/artificial-intelligence/ | 新闻通讯社 | ⭐⭐⭐⭐⭐ |
| MIT Technology Review | MIT Tech Review | https://www.technologyreview.com/topic/artificial-intelligence/ | 学术/深度 | ⭐⭐⭐⭐⭐ |
| OpenAI Blog | OpenAI Official | https://openai.com/blog/ | 官方博客 | ⭐⭐⭐⭐⭐ |
| Google AI Blog | Google Official | https://blog.google/technology/ai/ | 官方博客 | ⭐⭐⭐⭐⭐ |
| Anthropic Blog | Anthropic Official | https://www.anthropic.com/news | 官方博客 | ⭐⭐⭐⭐⭐ |
| 机器之心 | Synced | https://www.jiqizhixin.com/ | 国内媒体 | ⭐⭐⭐⭐ |
| 量子位 | QbitAI | https://www.qbitai.com/ | 国内媒体 | ⭐⭐⭐⭐ |

#### 1.2 来源分类

```typescript
type SourceType =
  | 'official'      // 官方博客（OpenAI、Google、Anthropic等）
  | 'tech-media'    // 科技媒体（TechCrunch、The Verge等）
  | 'news-agency'   // 新闻通讯社（Reuters、Bloomberg等）
  | 'chinese-media' // 中文媒体（机器之心、量子位等）
  | 'social'        // 社交媒体（Twitter/X、Reddit等）
  | 'research'      // 学术研究（arXiv、论文等）
```

#### 1.3 采集工具

```
工具: mcp__web_reader__webReader
参数:
  - return_format: markdown
  - timeout: 20秒
  - with_images_summary: false
```

#### 1.4 网络搜索

```
工具: WebSearch
搜索词模板:
  - "AI news today" after:[日期]
  - "OpenAI Google Anthropic AI model release"
  - "AI startup funding" after:[日期]
  - "AI breakthrough research" after:[日期]
  - "人工智能 最新动态" after:[日期]
```

---

### Phase 2: 内容过滤 (Content Filtering)

#### 2.1 保留标准

- ✅ 过去 24-48 小时内的新闻
- ✅ 重大公告（产品发布、模型发布）
- ✅ 行业动态（融资、并购、合作）
- ✅ 技术突破（新模型、新算法）
- ✅ 政策法规（监管、伦理）

#### 2.2 去重策略

- 相同新闻多来源时，保留最权威来源
- 优先级: 官方博客 > 新闻通讯社 > 权威媒体 > 聚合网站

#### 2.3 排除内容

- ❌ 营销软文
- ❌ 3天前的旧闻（除非重大）
- ❌ 重复报道
- ❌ 与 AI 无关的内容

---

### Phase 3: 分类整理 (Categorization)

#### 3.1 新闻分类

| 分类 | 图标 | 英文 | 说明 |
|------|------|------|------|
| 重大公告 | 🔥 | major | 产品发布、模型发布、重大公司动态 |
| 工具与应用 | 🛠️ | tools | 新工具、开源项目、应用场景 |
| 行业与商业 | 💰 | business | 融资、并购、合作、市场分析 |
| 政策与伦理 | 🌍 | policy | 监管、政策、伦理讨论 |

#### 3.2 新闻标签 (Badge)

| 标签 | 英文 | 颜色 | 说明 |
|------|------|------|------|
| 热门 | HOT | 红色 | 重大新闻、广泛关注 |
| 新品 | NEW | 蓝色 | 新产品/功能发布 |
| 更新 | UPDATE | 紫色 | 产品/模型更新 |
| 上市 | IPO | 橙色 | IPO相关 |
| 法律 | LEGAL | 深蓝 | 法律/诉讼 |
| 芯片 | CHIP | 绿色 | 芯片/硬件 |
| 融资 | FUNDING | 黄色 | 融资/投资 |
| 政策 | POLICY | 灰色 | 政策法规 |
| 欧盟 | EU | 靛蓝 | 欧盟相关 |
| 开源 | OPEN SOURCE | 绿色 | 开源项目 |

#### 3.3 新闻数据结构

```json
{
  "id": "唯一ID (YYYYMMDD+序号)",
  "title": "标题",
  "summary": "摘要 (1-2句话)",
  "points": ["要点1", "要点2", "要点3"],
  "source": {
    "name": "TechCrunch",
    "nameZh": "TechCrunch",
    "type": "tech-media",
    "url": "https://techcrunch.com/...",
    "favicon": "https://techcrunch.com/favicon.ico"
  },
  "publishedAt": "发布时间 (ISO 8601)",
  "category": "分类 (major/tools/business/policy)",
  "badge": "标签 (HOT/NEW/UPDATE等)"
}
```

---

### Phase 4: 输出格式化 (Output Formatting)

#### 4.1 更新数据文件

```
文件路径: /data/news/YYYY-MM-DD.json
```

#### 4.2 更新索引文件

```
文件路径: /data/index.json
包含: 最新新闻日期、统计数据
```

---

## 每日更新流程

### Claude 执行流程

```bash
# 1. 采集今日 AI 新闻
采集 TechCrunch、The Verge、VentureBeat 等来源
执行网络搜索补充

# 2. 整理新闻数据
过滤、分类、去重
标记来源信息和类型
生成 JSON 数据文件

# 3. 更新项目文件
更新 /data/news/YYYY-MM-DD.json
更新 /data/index.json

# 4. 提交到 Git
git add .
git commit -m "docs: update AI news for YYYY-MM-DD"
git push
```

### 自动部署

```
Git Push → GitHub → Vercel 自动构建 → 网站更新
```

---

## 新闻来源标记规范

### 来源显示格式

每条新闻必须在标题下方显示来源：

```
📰 来源：TechCrunch · 2小时前
```

### 来源图标

根据来源类型显示不同图标：

| 类型 | 图标 | 示例 |
|------|------|------|
| 官方博客 | 🏢 | OpenAI、Google、Anthropic |
| 科技媒体 | 📰 | TechCrunch、The Verge |
| 新闻通讯社 | 📡 | Reuters、Bloomberg |
| 中文媒体 | 🇨🇳 | 机器之心、量子位 |
| 学术研究 | 📚 | arXiv、论文 |
| 社交媒体 | 💬 | Twitter/X、Reddit |

### 来源链接

每条新闻必须包含原文链接，点击可跳转：

```html
<a href="https://techcrunch.com/..." target="_blank">
  📰 TechCrunch
</a>
```

---

## 项目结构

```
ai-news-daily/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── wechat/            # 微信导出页面
│   ├── layout.tsx         # 布局
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── NewsCard.tsx       # 新闻卡片
│   ├── CategorySection.tsx # 分类区块
│   ├── Header.tsx         # 页头
│   └── Footer.tsx         # 页脚
├── data/                  # 新闻数据
│   ├── index.json         # 索引
│   └── news/              # 按日期存储
│       ├── 2026-03-28.json
│       └── ...
├── lib/                   # 工具函数
│   ├── news.ts            # 数据读取
│   └── types.ts           # 类型定义
├── public/                # 静态资源
├── WORKFLOW.md            # 本文档
├── README.md              # 项目说明
└── package.json
```

---

## 命令参考

### 用户请求更新

```
"更新今日AI新闻"
"采集今日AI资讯"
"每日AI新闻更新"
```

### Claude 响应流程

1. 执行 4 阶段采集流程
2. 生成/更新 JSON 数据文件
3. 提交到 Git（需用户确认）
4. 等待 Vercel 自动部署

---

## 数据格式示例

### news/2026-03-28.json

```json
{
  "date": "2026-03-28",
  "generatedAt": "2026-03-28T08:00:00Z",
  "sources": ["TechCrunch", "The Verge", "VentureBeat", "Reuters"],
  "totalNews": 16,
  "categories": {
    "major": 3,
    "tools": 6,
    "business": 3,
    "policy": 4
  },
  "news": [
    {
      "id": "20260328001",
      "title": "OpenAI 关闭 Sora 视频生成项目",
      "summary": "OpenAI 突然宣布关闭其 AI 视频生成平台 Sora...",
      "points": [
        "VCs 正在向 AI 下一波技术投资数十亿美元",
        "此举令人意外，因为 AI 视频生成是当前热门赛道"
      ],
      "source": "TechCrunch",
      "sourceUrl": "https://techcrunch.com/...",
      "publishedAt": "2026-03-27T09:00:00Z",
      "category": "major",
      "badge": "HOT"
    }
  ],
  "summary": [
    "OpenAI 战略大调整：关闭 Sora 视频平台",
    "Anthropic 法律胜利：获得禁令保护",
    "Google 持续发力：发布多个 AI 产品更新"
  ]
}
```

### index.json

```json
{
  "currentDate": "2026-03-28",
  "lastUpdated": "2026-03-28T08:00:00Z",
  "totalDays": 15,
  "recentDates": [
    "2026-03-28",
    "2026-03-27",
    "2026-03-26"
  ]
}
```

---

## 注意事项

1. **时间处理**: 所有时间使用 ISO 8601 格式，存储为 UTC
2. **链接验证**: 确保所有 sourceUrl 可访问
3. **去重**: 同一新闻不重复出现在多个分类
4. **平衡**: 各分类新闻数量尽量均衡
5. **质量**: 优先权威来源，避免营销内容
6. **来源标记**: 每条新闻必须明确标记来源媒体
7. **可信度**: 优先显示官方来源和高可信度媒体
