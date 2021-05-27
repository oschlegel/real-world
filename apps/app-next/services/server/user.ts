import { User } from '../../models/user';
import { UserResponse } from '../../models/user-response';
import { get } from '../../utils/server/https';

export async function getUser(token: string): Promise<User> {
  const response = await get<UserResponse>(
    'https://conduit.productionready.io/api/user',
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  return response.user;
}
