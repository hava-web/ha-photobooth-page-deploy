import { MOCK_NEWS_CARDS } from 'containers/marketing/data/newsMockData';
import type { NewsCardModel, NewsDetailModel } from 'models/news/news.model';

export async function listNews(): Promise<NewsCardModel[]> {
  return MOCK_NEWS_CARDS.map((card) => ({
    id: card.id,
    image: card.image,
    title: card.title,
    text: card.text,
  }));
}

export async function getNewsDetail(
  newsId: string,
): Promise<NewsDetailModel | null> {
  const newsDetail = MOCK_NEWS_CARDS.find((card) => card.id === newsId);

  return newsDetail
    ? {
        ...newsDetail,
        content: [...newsDetail.content],
      }
    : null;
}
