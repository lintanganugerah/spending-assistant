export default function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch {
    return true; // token error maka dianggap expired
  }
}
