import { User } from '@real-world/models';
import { UserResponse } from '@real-world/models';
import { get } from '../../utils/server/https';

export async function getUser(token: string): Promise<User> {
  const response = await get<UserResponse>(
    'https://api.realworld.io/api/user',
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  return response.user;
}
