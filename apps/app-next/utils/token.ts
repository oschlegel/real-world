import jwt_decode from 'jwt-decode';
import { JwtPayload } from '@real-world/models';

export function getTokenPayload(token: string): JwtPayload {
  return jwt_decode(token);
}
