/**
 * Get the session token from the Authorization header
 */
export function extractToken(req): string | undefined {
  const authHeader = req.get('Authorization');
  const matches = authHeader.match(/JWT\s+(.+)$/i);

  if (matches) {
    return matches[1];
  }
}
