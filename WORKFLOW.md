# AI Daily News 工作流程

## 项目概述

这是一个自动化的 AI 新闻聚合项目，每日采集最前沿的 AI 资讯，并通过 Vercel 自动部署到线上。

---

## 信息搜集流程

### Phase 1: 信息采集 (Information Gathering)

#### 1.1 主要新闻源

| 来源 | URL | 类型 |
|------|-----|------|
| TechCrunch AI | https://techcrunch.com/category/artificial-intelligence/ | 综合科技媒体 |
| The Verge AI | https://www.theverge.com/ai-artificial-intelligence | 综合科技媒体 |
| VentureBeat AI | https://venturebeat.com/category/ai/ | 企业AI焦点 |
| Reuters AI | https://www.reuters.com/technology/artificial-intelligence/ | 新闻通讯社 |
| MIT Technology Review | https://www.technologyreview.com/topic/artificial-intelligence/ | 学术/深度 |

#### 1.2 采集工具

```
工具: mcp__web_reader__webReader
参数:
  - return_format: markdown
  - timeout: 20秒
  - with_images_summary: false
```

#### 1.3 网络搜索

```
工具: WebSearch
搜索词模板:
  - "AI news today" after:[日期]
  - "OpenAI Google Anthropic AI model release"
  - "AI startup funding" after:[日期]
  - "AI breakthrough research" after:[日期]
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
- 优先级: 公司官方博客 > 权威媒体 > 聚合网站

#### 2.3 排除内容

- ❌ 营销软文
- ❌ 3天前的旧闻（除非重大）
- ❌ 重复报道
- ❌ 与 AI 无关的内容

---

### Phase 3: 分类整理 (Categorization)

#### 3.1 新闻分类

| 分类 | 图标 | 说明 |
|------|------|------|
| Major Announcements | 🔥 | 产品发布、模型发布、重大公司动态 |
| Research & Papers | 🔬 | 学术突破、研究论文、新算法 |
| Industry & Business | 💰 | 融资、并购、合作、市场分析 |
| Tools & Applications | 🛠️ | 新工具、开源项目、应用场景 |
| Policy & Ethics | 🌍 | 监管、政策、伦理讨论 |

#### 3.2 新闻字段

```json
{
  "id": "唯一ID (时间戳+序号)",
  "title": "标题",
  "summary": "摘要 (1-2句话)",
  "points": ["要点1", "要点2", "要点3"],
  "source": "来源媒体",
  "sourceUrl": "原文链接",
  "publishedAt": "发布时间",
  "category": "分类",
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
生成 JSON 数据文件

# 3. 更新项目文件
更新 /data/news/YYYY-MM-DD.json
更新 /data/index.json
更新 /data/latest.json

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

## 项目结构

```
ai-news-daily/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── layout.tsx         # 布局
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── NewsCard.tsx       # 新闻卡片
│   ├── CategorySection.tsx # 分类区块
│   └── ...
├── data/                  # 新闻数据
│   ├── index.json         # 索引
│   ├── latest.json        # 最新新闻
│   └── news/              # 按日期存储
│       ├── 2026-03-28.json
│       └── ...
├── lib/                   # 工具函数
│   └── news.ts            # 数据读取
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
  "sources": ["TechCrunch", "The Verge", "VentureBeat"],
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

### latest.json

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
