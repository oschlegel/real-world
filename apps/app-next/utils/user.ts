export function getUserIdFromUsername(username: string): string {
  return username.toLowerCase().replace(' ', '-');
}
