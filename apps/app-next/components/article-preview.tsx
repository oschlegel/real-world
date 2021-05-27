import React, { Component } from 'react';
import { Article } from '../models/article';
import { getUserIdFromUsername } from '../utils/user';
import FavoriteArticleButton from './favorite-article-button';

export interface ArticlePreviewProps {
  article: Article;
  token: string;
}

export interface ArticlePreviewState {
  article: Article;
}

export class ArticlePreview extends Component<
  ArticlePreviewProps,
  ArticlePreviewState
> {
  constructor(props: ArticlePreviewProps) {
    super(props);
    this.state = { article: props.article };
  }

  get articleHref(): string {
    return `/article/${this.state.article.slug}`;
  }

  get profileHref(): string {
    return `/profile/${getUserIdFromUsername(
      this.state.article.author.username
    )}`;
  }

  get date(): string {
    return new Date(
      this.state.article.updatedAt || this.state.article.createdAt
    ).toDateString();
  }

  render() {
    return (
      <div className="article-preview">
        <div className="article-meta">
          <a href="profile.html">
            <img src={this.state.article.author.image} alt="" />
          </a>
          <div className="info">
            <a href={this.profileHref} className="author">
              {this.state.article.author.username}
            </a>
            <span className="date">{this.date}</span>
          </div>
          <span className="pull-xs-right">
            <FavoriteArticleButton
              article={this.state.article}
              token={this.props.token}
            ></FavoriteArticleButton>
          </span>
        </div>
        <a href={this.articleHref} className="preview-link">
          <h1>{this.state.article.title}</h1>
          <p>{this.state.article.description}</p>
          <span>Read more...</span>
          <ul className="tag-list">
            {this.state.article.tagList.map((tag) => (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </a>
      </div>
    );
  }
}

export default ArticlePreview;
