import { UserResponse } from '../../models/user-response';
import { User } from '../../models/user';

export async function register(
  username: string,
  email: string,
  password: string
): Promise<User> {
  const response = await fetch('https://conduit.productionready.io/api/users', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      user: { username, email, password },
    }),
  });
  const responseJSON: UserResponse = await response.json();

  if (response.status === 422) {
    throw responseJSON;
  }

  return responseJSON.user;
}

export async function login(email: string, password: string): Promise<User> {
  const response = await fetch(
    'https://conduit.productionready.io/api/users/login',
    {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        user: { email, password },
      }),
    }
  );
  const responseJSON: UserResponse = await response.json();

  if (response.status === 422) {
    throw responseJSON;
  }

  return responseJSON.user;
}
