/** Builds the client-side destination used after a social member login. */
export function memberAuthRedirect(origin: string) {
  return new URL("/echoes", origin).toString();
}

/** Keeps a Google sign-in on an explicit account-selection step instead of reusing a blocked browser account silently. */
export function memberGoogleAuthOptions(origin: string) {
  return {
    redirectTo: memberAuthRedirect(origin),
    queryParams: { prompt: "select_account" },
  };
}
