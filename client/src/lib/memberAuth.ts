/** Builds the client-side destination used after a social member login. */
export function memberAuthRedirect(origin: string) {
  return new URL("/echoes", origin).toString();
}
