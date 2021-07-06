import { Article } from './article';

export interface ArticleListResponse {
  articles: Article[];
  articlesCount: number;
}
