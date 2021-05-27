import jwt_decode from 'jwt-decode';
import { JwtPayload } from '../models/jwt-payload';

export function getTokenPayload(token: string): JwtPayload {
  return jwt_decode(token);
}
