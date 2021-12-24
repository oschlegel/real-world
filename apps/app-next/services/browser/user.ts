import { UserResponse } from '@real-world/models';
import { User } from '@real-world/models';

export async function register(
  username: string,
  email: string,
  password: string
): Promise<User> {
  const response = await fetch('https://api.realworld.io/api/users', {
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
  const response = await fetch('https://api.realworld.io/api/users/login', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      user: { email, password },
    }),
  });
  const responseJSON: UserResponse = await response.json();

  if (response.status === 422) {
    throw responseJSON;
  }

  return responseJSON.user;
}
