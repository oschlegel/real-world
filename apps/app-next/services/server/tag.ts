import { TagListResponse } from '../../models/tag-list-response';
import { get } from '../../utils/server/https';

export async function getTagList(): Promise<string[]> {
  const response = await get<TagListResponse>(
    'https://conduit.productionready.io/api/tags',
    {}
  );

  return response.tags;
}
