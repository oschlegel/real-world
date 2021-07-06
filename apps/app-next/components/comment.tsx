import React from 'react';
import { Comment as CommentModel } from '@real-world/models';
import { getUserIdFromUsername } from '../utils/user';

/* eslint-disable-next-line */
export interface CommentProps {
  comment: CommentModel;
}

export function Comment(props: CommentProps) {
  const profileHref = `/profile/${getUserIdFromUsername(
    props.comment.author.username
  )}`;
  const date = new Date(
    props.comment.updatedAt || props.comment.createdAt
  ).toDateString();

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{props.comment.body}</p>
      </div>
      <div className="card-footer">
        <a href={profileHref} className="comment-author">
          <img
            src={props.comment.author.image}
            className="comment-author-img"
            alt=""
          />
        </a>
        &nbsp;
        <a href={profileHref} className="comment-author">
          {props.comment.author.username}
        </a>
        <span className="date-posted">{date}</span>
        <span className="mod-options">
          <i className="ion-edit"></i>
          <i className="ion-trash-a"></i>
        </span>
      </div>
    </div>
  );
}

export default Comment;
