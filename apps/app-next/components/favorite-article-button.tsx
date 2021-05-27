import React, { Component } from 'react';
import { Article } from '../models/article';
import {
  favoriteArticle,
  unfavoriteArticle,
} from '../services/browser/article';

export interface FavoriteArticleButtonProps {
  article: Article;
  token: string;
  withLabel?: boolean;
}

export interface FavoriteArticleButtonState {
  article: Article;
}

export class FavoriteArticleButton extends Component<
  FavoriteArticleButtonProps,
  FavoriteArticleButtonState
> {
  constructor(props: FavoriteArticleButtonProps) {
    super(props);
    this.state = { article: props.article };
  }

  async onClick() {
    if (this.state.article.favorited) {
      const article = await unfavoriteArticle(this.state.article.slug);
      this.setState({ article });
    } else {
      const article = await favoriteArticle(this.state.article.slug);
      this.setState({ article });
    }
  }

  render() {
    return (
      <button
        className={`btn btn-outline-primary btn-sm ${
          this.state.article.favorited ? 'active' : ''
        } ${this.props.token ? '' : 'disabled'}`}
        onClick={() => this.onClick()}
      >
        <i className="ion-heart"></i>{' '}
        {this.props.withLabel
          ? `Favorite Post (${this.state.article.favoritesCount})`
          : this.state.article.favoritesCount}
      </button>
    );
  }
}

export default FavoriteArticleButton;

{
  /* <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart"></i>
                &nbsp; Favorite Post{' '}
                <span className="counter">({article.favoritesCount})</span>
              </button> */
}
