# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AI News Daily** is a daily AI news aggregation platform built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. It collects AI news from multiple sources and displays them in a clean, modern interface.

---

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production (outputs to /out)
npm run lint     # Run ESLint
```

---

## Architecture

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (static export)
- **Data Storage**: JSON files in `/data` directory

### Data Flow

```
/data/news/YYYY-MM-DD.json → lib/news.ts (fs read) → app/page.tsx (SSG) → Static HTML
```

- News data stored as JSON files
- Server components read data at build time using Node.js `fs`
- Pages are statically generated (SSG)
- No database required

### Directory Structure

```
├── app/
│   ├── page.tsx              # Homepage (Server Component)
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles + Tailwind
│   └── wechat/
│       ├── page.tsx          # WeChat export (Server Component)
│       └── WechatClient.tsx  # Client component for export
├── components/
│   ├── NewsCard.tsx          # Individual news card
│   ├── CategorySection.tsx   # News grouped by category
│   ├── SummarySection.tsx    # Daily summary highlights
│   ├── Header.tsx            # Page header with navigation
│   └── Footer.tsx            # Page footer
├── data/
│   ├── index.json            # News index (dates, stats)
│   └── news/
│       └── YYYY-MM-DD.json   # Daily news data
├── lib/
│   ├── news.ts               # Data reading functions
│   └── types.ts              # TypeScript type definitions
```

---

## Data Schema

### DailyNews (data/news/YYYY-MM-DD.json)

```typescript
interface DailyNews {
  date: string;           // "2026-03-28"
  generatedAt: string;    // ISO 8601 timestamp
  sources: string[];      // ["TechCrunch", "The Verge"]
  totalNews: number;      // 16
  categories: {
    major: number;
    tools: number;
    business: number;
    policy: number;
  };
  news: NewsItem[];
  summary: string[];      // 3-5 key highlights
}
```

### NewsItem

```typescript
interface NewsItem {
  id: string;             // "20260328001" (YYYYMMDD + seq)
  title: string;
  summary: string;        // 1-2 sentences
  points: string[];       // 3-5 bullet points
  source: string;         // "TechCrunch"
  sourceUrl: string;      // Original article URL
  publishedAt: string;    // ISO 8601 timestamp
  category: Category;     // "major" | "tools" | "business" | "policy"
  badge?: Badge;          // Optional: "HOT" | "NEW" | "UPDATE" | etc.
}
```

### Category Types

| Category | Icon | Description |
|----------|------|-------------|
| `major` | 🔥 | Major announcements, product/model releases |
| `tools` | 🛠️ | New tools, open source, applications |
| `business` | 💰 | Funding, M&A, partnerships, market |
| `policy` | 🌍 | Regulations, policy, ethics |

### Badge Types

| Badge | Color | Use Case |
|-------|-------|----------|
| `HOT` | Red | Breaking news, major announcement |
| `NEW` | Blue | New product/feature release |
| `UPDATE` | Purple | Product/model update |
| `IPO` | Orange | IPO related |
| `LEGAL` | Dark Blue | Legal/lawsuit |
| `CHIP` | Green | Chip/hardware |
| `FUNDING` | Yellow | Funding/investment |
| `POLICY` | Gray | Policy/regulation |
| `EU` | Indigo | EU specific |
| `OPEN SOURCE` | Green | Open source project |

---

## News Sources

### Primary Sources (⭐⭐⭐⭐⭐)

| Source | URL | Type |
|--------|-----|------|
| TechCrunch AI | /category/artificial-intelligence/ | Tech Media |
| The Verge AI | /ai-artificial-intelligence | Tech Media |
| Reuters AI | /technology/artificial-intelligence/ | News Agency |
| OpenAI Blog | /blog/ | Official |
| Google AI Blog | /technology/ai/ | Official |
| Anthropic Blog | /news | Official |

### Source Display Rules

1. Always show source name with icon
2. Link to original article
3. Color code by source type:
   - 📰 Tech Media (TechCrunch, The Verge)
   - 📡 News Agency (Reuters, Bloomberg)
   - 🏢 Official (OpenAI, Google, Anthropic)
   - 🇨🇳 Chinese Media (机器之心, 量子位)

---

## Daily Update Workflow

### Trigger Phrases

```
"更新今日AI新闻"
"采集今日AI资讯"
"每日AI新闻更新"
```

### Update Process

1. **Gather** - Fetch from primary sources using `mcp__web_reader__webReader`
2. **Search** - Use `WebSearch` with date filters for additional news
3. **Filter** - Keep last 24-48 hours, remove duplicates
4. **Categorize** - Sort into 4 categories with appropriate badges
5. **Output** - Create/update `/data/news/YYYY-MM-DD.json`
6. **Index** - Update `/data/index.json` with new date
7. **Commit** - `git add . && git commit -m "docs: update AI news for YYYY-MM-DD" && git push`

### Quality Standards

- **Timeliness**: News within 24-48 hours
- **Significance**: Major announcements over minor updates
- **Balance**: Distribute news across all 4 categories
- **Sources**: Prefer official sources and authoritative media
- **Deduplication**: Same story from multiple sources → keep most authoritative

---

## Code Conventions

### Components

- Use `'use client'` directive only when interactivity is needed
- Server Components by default for data fetching
- Client Components for: click handlers, state, browser APIs

### Styling

- Use Tailwind CSS classes
- Follow dark theme color palette:
  - Background: `#1a1a2e`, `#16213e`
  - Primary: `#00d4ff` (cyan)
  - Accent: `#7b2cbf` (purple)
  - Text: `#e0e0e0` (light gray)

### File Naming

- React components: PascalCase (`NewsCard.tsx`)
- Utilities: camelCase (`news.ts`)
- Data files: ISO date format (`2026-03-28.json`)

### Git Commits

Use conventional commits:
```
feat: add new feature
fix: bug fix
docs: documentation update
chore: maintenance
style: formatting
```

---

## Export Features

### WeChat Export (`/wechat`)

- Generate formatted HTML for WeChat official accounts
- Export as PNG long image
- Export as PDF
- Mobile preview simulation

### Export Process

1. Navigate to `/wechat`
2. Click export button (Image or PDF)
3. File auto-downloads
4. Paste into WeChat editor

---

## Deployment

- Platform: Vercel
- Trigger: Push to `main` branch
- Build: `npm run build` (static export)
- Output: Static HTML files

### Vercel Configuration

- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `out`
- Node.js Version: 18.x

---

## Common Tasks

### Add a New News Source

1. Update `WORKFLOW.md` with source details
2. Add source icon to `SOURCE_ICONS` in `NewsCard.tsx`
3. Add source color to `SOURCE_COLORS` if needed

### Modify Categories

1. Update `Category` type in `lib/types.ts`
2. Update `CATEGORY_CONFIG` in `lib/types.ts`
3. Update `newsByCategory` in `app/page.tsx`

### Add New Badge

1. Add to `Badge` type in `lib/types.ts`
2. Add color to `BADGE_COLORS` in `lib/types.ts`

---

---

## Collaboration Guide (协作指南)

### 提交 PR 流程

#### 1. 创建分支

```bash
# 从 main 创建功能分支
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# 或修复分支
git checkout -b fix/your-fix-name
```

#### 2. 分支命名规范

| 类型 | 前缀 | 示例 |
|------|------|------|
| 新功能 | `feature/` | `feature/add-rss-feed` |
| 修复 | `fix/` | `fix/news-card-style` |
| 文档 | `docs/` | `docs/update-workflow` |
| 重构 | `refactor/` | `refactor/news-data-structure` |
| 测试 | `test/` | `test/add-news-card-tests` |

#### 3. 提交代码

```bash
# 查看变更
git status
git diff

# 添加文件
git add .

# 提交（使用规范格式）
git commit -m "feat: add RSS feed support"
```

#### 4. 推送并创建 PR

```bash
# 推送分支
git push origin feature/your-feature-name

# 在 GitHub 上创建 Pull Request
```

#### 5. PR 标题格式

```
<type>(<scope>): <description>

示例:
feat(wechat): add PDF export feature
fix(newscard): source icon not showing
docs(workflow): add collaboration guide
```

### 核心文件说明

| 文件 | 重要性 | 说明 |
|------|--------|------|
| `lib/types.ts` | ⭐⭐⭐⭐⭐ | 类型定义，修改需谨慎 |
| `lib/news.ts` | ⭐⭐⭐⭐⭐ | 数据读取核心逻辑 |
| `data/*.json` | ⭐⭐⭐⭐⭐ | 新闻数据，每日更新 |
| `app/page.tsx` | ⭐⭐⭐⭐ | 首页，展示逻辑 |
| `components/NewsCard.tsx` | ⭐⭐⭐⭐ | 新闻卡片组件 |
| `WORKFLOW.md` | ⭐⭐⭐⭐ | 工作流程文档 |
| `CLAUDE.md` | ⭐⭐⭐⭐ | 本文档 |

### 修改注意事项

#### 数据结构变更 (lib/types.ts)

⚠️ **高风险** - 需要同步更新：
1. 所有现有 JSON 数据文件
2. 使用该类型的所有组件
3. lib/news.ts 中的读取逻辑

```bash
# 修改类型后必须检查
grep -r "NewsItem" components/ app/ lib/
```

#### 新增新闻来源

✅ **低风险** - 只需更新：
1. `WORKFLOW.md` - 添加来源说明
2. `components/NewsCard.tsx` - 添加 `SOURCE_ICONS` 和 `SOURCE_COLORS`

#### 样式修改

✅ **低风险** - 只影响视觉效果：
1. `app/globals.css` - 全局样式
2. 组件内的 Tailwind 类名

### PR 检查清单

提交 PR 前请确认：

- [ ] 代码可正常编译 (`npm run build`)
- [ ] 没有 TypeScript 错误
- [ ] 没有 ESLint 警告
- [ ] 本地测试通过 (`npm run dev`)
- [ ] 数据文件格式正确（JSON 语法）
- [ ] 提交信息符合规范
- [ ] PR 标题描述清晰

### 代码审查要点

审查 PR 时重点关注：

1. **类型安全** - 是否正确使用 TypeScript 类型
2. **数据一致性** - 修改数据结构时是否同步更新
3. **组件职责** - 组件是否保持单一职责
4. **样式规范** - 是否遵循 Tailwind CSS 规范
5. **文档更新** - 是否同步更新相关文档

---

## Troubleshooting

### Build Errors

- Check JSON syntax in data files
- Verify all imports are correct
- Ensure `output: 'export'` in `next.config.js`

### Data Not Loading

- Verify `/data/index.json` exists and is valid JSON
- Check `recentDates` array has valid date strings
- Ensure corresponding news file exists in `/data/news/`

### Vercel Deployment Fails

- Check build logs in Vercel dashboard
- Verify Node.js version compatibility
- Ensure all dependencies are in `package.json`

### TypeScript Errors

- Run `npm run build` to see detailed errors
- Check type imports are correct
- Verify `lib/types.ts` exports are used properly
