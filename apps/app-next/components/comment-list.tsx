import React, { Component } from 'react';
import { Comment as CommentModel } from '@real-world/models';
import Comment from './comment';
import CommentForm from './comment-form';

export interface CommentListProps {
  comments: CommentModel[];
  token: string;
}

export class CommentList extends Component<CommentListProps> {
  render() {
    return (
      <>
        <CommentForm></CommentForm>

        {this.props.comments.map((comment) => (
          <Comment comment={comment} key={comment.id}></Comment>
        ))}
      </>
    );
  }
}

export default CommentList;
