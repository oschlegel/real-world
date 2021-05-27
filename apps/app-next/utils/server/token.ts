import { GetServerSidePropsContext } from 'next';

export function getToken(context: GetServerSidePropsContext): string {
  return context.req.cookies.token;
}
