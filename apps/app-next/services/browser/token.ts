export function setToken(token: string) {
  window.document.cookie = `token=${token}`;
}

export function getToken(): string {
  const result = /token=([^;]+)(;|$)/.exec(window.document.cookie);
  return result.length > 0 ? result[1] : null;
}
