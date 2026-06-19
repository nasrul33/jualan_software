const ALLOWED_LOGIN_PROTOCOLS = new Set(["http:", "https:"]);

export function resolveLoginRedirectUrl(
  appUrl: string,
  requestUrl: string,
): URL {
  const target = new URL(appUrl);

  if (!ALLOWED_LOGIN_PROTOCOLS.has(target.protocol)) {
    throw new Error("NEXT_PUBLIC_APP_URL must use http or https.");
  }

  const request = new URL(requestUrl);
  request.searchParams.forEach((value, key) => {
    target.searchParams.append(key, value);
  });

  return target;
}
