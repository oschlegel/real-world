import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import styled from 'styled-components';
import CommentList from '../../components/comment-list';
import FavoriteArticleButton from '../../components/favorite-article-button';
import { Article, Comment as CommentModel } from '@real-world/models';
import { getArticle } from '../../services/server/article';
import { getCommentList } from '../../services/server/comment';
import { getToken } from '../../utils/server/token';
import { getUserIdFromUsername } from '../../utils/user';

interface ServerSideProps {
  article: Article;
  comments: CommentModel[];
  token: string;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
) => {
  const token = getToken(context);
  const slug = context.params.id.toString();

  const [article, comments] = await Promise.all([
    getArticle(slug),
    getCommentList(slug),
  ]);

  return {
    props: {
      article,
      comments,
      token,
    },
  };
};

const StyledId = styled.div`
  color: inherit;
`;

export function Id({
  article,
  comments,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const profileHref = `/profile/${getUserIdFromUsername(
    article.author.username
  )}`;
  const date = new Date(article.updatedAt || article.createdAt).toDateString();

  return (
    <StyledId>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>

            <div className="article-meta">
              <a href={profileHref}>
                <img src={article.author.image} alt="" />
              </a>
              <div className="info">
                <a href={profileHref} className="author">
                  {article.author.username}
                </a>
                <span className="date">{date}</span>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp; Follow {article.author.username}{' '}
                <span className="counter">(10)</span>
              </button>
              &nbsp;&nbsp;
              <FavoriteArticleButton
                article={article}
                token={token}
                withLabel={true}
              ></FavoriteArticleButton>
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">{article.body}</div>
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <a href="/profile/eric-simons">
                <img src={article.author.image} alt="" />
              </a>
              <div className="info">
                <a href="/profile/eric-simons" className="author">
                  {article.author.username}
                </a>
                <span className="date">{date}</span>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp; Follow {article.author.username}{' '}
                <span className="counter">(10)</span>
              </button>
              &nbsp;
              <FavoriteArticleButton
                article={article}
                token={token}
                withLabel={true}
              ></FavoriteArticleButton>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <CommentList comments={comments} token={token}></CommentList>
            </div>
          </div>
        </div>
      </div>
    </StyledId>
  );
}

export default Id;
