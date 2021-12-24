import { TagListResponse } from '@real-world/models';
import { get } from '../../utils/server/https';

export async function getTagList(): Promise<string[]> {
  const response = await get<TagListResponse>(
    'https://api.realworld.io/api/tags',
    {}
  );

  return response.tags;
}
