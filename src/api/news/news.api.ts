import { MOCK_NEWS_CARDS } from 'containers/marketing/data/newsMockData';
import type { NewsCardModel } from 'models/news/news.model';

export async function listNews(): Promise<NewsCardModel[]> {
  return MOCK_NEWS_CARDS.map((card) => ({ ...card }));
}
