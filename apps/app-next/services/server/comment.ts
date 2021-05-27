import { Comment } from '../../models/comment';
import { CommentListResponse } from '../../models/comment-list-response';
import { get } from '../../utils/server/https';

export async function getCommentList(
  slug: string,
  token?: string
): Promise<Comment[]> {
  const response = await get<CommentListResponse>(
    `https://conduit.productionready.io/api/articles/${slug}/comments`,
    {
      headers: token && {
        Authorization: `Token ${token}`,
      },
    }
  );

  return response.comments;
}
