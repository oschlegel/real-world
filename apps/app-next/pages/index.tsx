import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import React from 'react';
import ArticlePreview from '../components/article-preview';
import { Article } from '@real-world/models';
import { getArticleList, getFeedArticleList } from '../services/server/article';
import { getTagList } from '../services/server/tag';
import { getToken } from '../utils/server/token';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = getToken(context);
  let articlesPromise: Promise<Article[]>;
  let globalFeedActive = false;
  let myFeedActive = false;

  if (context.query.tag) {
    articlesPromise = getArticleList({ tag: context.query.tag.toString() });
  } else if (context.query.myfeed !== undefined) {
    articlesPromise = getFeedArticleList(token);
    myFeedActive = true;
  } else {
    articlesPromise = getArticleList({});
    globalFeedActive = true;
  }

  const [tags, articles] = await Promise.all([getTagList(), articlesPromise]);

  return {
    props: {
      articles,
      globalFeedActive,
      myFeedActive,
      tags,
      token,
    },
  };
};

export function Index({
  articles,
  globalFeedActive,
  myFeedActive,
  tags,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a
                    className={`nav-link ${myFeedActive ? 'active' : ''} ${
                      token ? '' : 'disabled'
                    }`}
                    href="/?myfeed"
                  >
                    Your Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${globalFeedActive ? 'active' : ''}`}
                    href="/"
                  >
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>

            {articles.map((article) => (
              <ArticlePreview
                article={article}
                token={token}
                key={article.slug}
              ></ArticlePreview>
            ))}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tags.map((tag, index) => (
                  <a
                    href={`/?tag=${tag}`}
                    className="tag-pill tag-default"
                    key={index}
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
