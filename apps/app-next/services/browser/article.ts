import { ArticleResponse } from '@real-world/models';
import { Article } from '@real-world/models';
import { getToken } from './token';

export async function favoriteArticle(slug: string): Promise<Article> {
  const response = await fetch(
    `https://api.realworld.io/api/articles/${slug}/favorite`,
    {
      method: 'POST',
      headers: new Headers({ Authorization: `Token ${getToken()}` }),
    }
  );
  const responseJSON: ArticleResponse = await response.json();

  return responseJSON.article;
}

export async function unfavoriteArticle(slug: string): Promise<Article> {
  const response = await fetch(
    `https://api.realworld.io/api/articles/${slug}/favorite`,
    {
      method: 'DELETE',
      headers: new Headers({ Authorization: `Token ${getToken()}` }),
    }
  );
  const responseJSON: ArticleResponse = await response.json();

  return responseJSON.article;
}
