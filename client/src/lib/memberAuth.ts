/** Builds the client-side destination used after a social member login. */
export function memberRoute(path: string, base = "/") {
  const normalizedBase = base === "/" ? "" : `/${base.replace(/^\/+|\/+$/g, "")}`;
  return `${normalizedBase}${path}`;
}

export function memberAuthRedirect(origin: string, base = "/") {
  return new URL(memberRoute("/echoes", base), origin).toString();
}

export function memberEmailConfirmationRedirect(origin: string, base = "/") {
  return new URL(memberRoute("/email-confirmed", base), origin).toString();
}

/** Keeps a Google sign-in on an explicit account-selection step instead of reusing a blocked browser account silently. */
export function memberGoogleAuthOptions(origin: string, base = "/") {
  return {
    redirectTo: memberAuthRedirect(origin, base),
    queryParams: { prompt: "select_account" },
  };
}
