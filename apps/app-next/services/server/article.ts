import { Article } from '@real-world/models';
import { ArticleListResponse } from '@real-world/models';
import { ArticleResponse } from '@real-world/models';
import { get } from '../../utils/server/https';

export interface GetArticleListOptions {
  limit?: number;
  offset?: number;
  tag?: string;
  author?: string;
  favorited?: string;
}

export async function getArticleList(
  options: GetArticleListOptions,
  token?: string
): Promise<Article[]> {
  const query = Object.entries(options)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const response = await get<ArticleListResponse>(
    `https://api.realworld.io/api/articles?${query}`,
    {
      headers: token && {
        Authorization: `Token ${token}`,
      },
    }
  );

  return response.articles;
}

export async function getFeedArticleList(token: string): Promise<Article[]> {
  const response = await get<ArticleListResponse>(
    `https://api.realworld.io/api/articles/feed`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  return response.articles;
}

export async function getArticle(slug: string): Promise<Article> {
  const response = await get<ArticleResponse>(
    `https://api.realworld.io/api/articles/${slug}`,
    {}
  );

  return response.article;
}
