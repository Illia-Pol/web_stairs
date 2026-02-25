const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const basePath =
  rawBasePath && rawBasePath !== "/"
    ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`
    : "";

export function withBasePath(pathname: string): string {
  if (!pathname) return basePath || "/";
  if (/^https?:\/\//.test(pathname)) return pathname;
  if (pathname.startsWith(basePath + "/") || pathname === basePath) return pathname;

  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${basePath}${normalized}`;
}

export function assetPath(pathname: string): string {
  return withBasePath(pathname);
}
