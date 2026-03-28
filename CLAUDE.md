# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI News Daily is a daily AI news aggregation platform built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. It statically exports and deploys to Vercel.

## Commands

```bash
npm run dev      # Local development (localhost:3000)
npm run build    # Production build (outputs to /out)
npm run lint     # Run ESLint
```

## Architecture

### Data Flow
- News data stored as JSON in `/data/news/YYYY-MM-DD.json`
- `/data/index.json` tracks `recentDates` array for determining latest news
- `/lib/news.ts` reads JSON files at build time using Node.js `fs`
- Pages are statically generated at build time

### News Data Structure
- **Category**: `'major'` | `'tools'` | `'business'` | `'policy'`
- **Badge**: `'HOT'` | `'NEW'` | `'UPDATE'` | `'IPO'` | `'LEGAL'` | `'CHIP'` | `'FUNDING'` | `'POLICY'` | `'EU'` | `'OPEN SOURCE'`
- See `/lib/types.ts` for full type definitions

### Component Structure
- `/app/page.tsx` - Main page, fetches latest news and renders by category
- `/components/NewsCard.tsx` - Individual news card with badge styling
- `/components/CategorySection.tsx` - Groups news by category with grid layout

## Daily Update Workflow

When user requests "更新今日AI新闻" or similar:

1. **Gather** - Fetch from TechCrunch, The Verge, VentureBeat, Reuters using `mcp__web_reader__webReader` and `WebSearch`
2. **Filter** - Keep last 24-48 hours, remove duplicates and marketing content
3. **Categorize** - Sort into 4 categories: major, tools, business, policy
4. **Output** - Create `/data/news/YYYY-MM-DD.json` and update `/data/index.json`

### News JSON Format
```json
{
  "date": "2026-03-28",
  "generatedAt": "2026-03-28T08:00:00Z",
  "sources": ["TechCrunch", "The Verge"],
  "totalNews": 15,
  "categories": { "major": 3, "tools": 6, "business": 3, "policy": 4 },
  "news": [...],
  "summary": ["要点1", "要点2", "要点3"]
}
```

After updating data files, commit and push to trigger Vercel deployment:
```bash
git add . && git commit -m "docs: update AI news for YYYY-MM-DD" && git push
```
