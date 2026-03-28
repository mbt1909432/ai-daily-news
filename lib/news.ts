import fs from 'fs';
import path from 'path';
import { DailyNews, NewsIndex } from './types';

const dataDir = path.join(process.cwd(), 'data');

export function getNewsIndex(): NewsIndex | null {
  try {
    const filePath = path.join(dataDir, 'index.json');
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export function getDailyNews(date: string): DailyNews | null {
  try {
    const filePath = path.join(dataDir, 'news', `${date}.json`);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export function getLatestNews(): DailyNews | null {
  const index = getNewsIndex();
  if (!index || index.recentDates.length === 0) return null;
  return getDailyNews(index.recentDates[0]);
}

export function getAllNews(): DailyNews[] {
  const index = getNewsIndex();
  if (!index) return [];

  return index.recentDates
    .map(date => getDailyNews(date))
    .filter((news): news is DailyNews => news !== null);
}
