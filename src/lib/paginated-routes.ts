import { paginate } from "@/lib/pagination";

/**
 * Generate static paths for paginated collection pages.
 * Returns an array of { params, props } suitable for getStaticPaths().
 */
export function generatePaginatedPaths<T>(
  items: T[],
  perPage: number
): {
  params: { page: string | undefined };
  props: {
    items: T[];
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}[] {
  const totalPages = Math.ceil(items.length / perPage);

  // Always generate at least the first page, even when empty
  if (totalPages === 0) {
    return [
      {
        params: { page: undefined },
        props: {
          items: [],
          currentPage: 1,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
      },
    ];
  }

  return Array.from({ length: totalPages }, (_, i) => {
    const page = i + 1;
    const paginatedResult = paginate(items, page, perPage);

    return {
      params: { page: page === 1 ? undefined : String(page) },
      props: { ...paginatedResult },
    };
  });
}

/**
 * Build previous/next pagination URLs for a given base path.
 */
export function buildPaginationUrls(
  basePath: string,
  currentPage: number,
  hasPrev: boolean,
  hasNext: boolean
): {
  prevUrl: string | null;
  nextUrl: string | null;
} {
  const prevUrl = hasPrev
    ? currentPage === 2
      ? basePath
      : `${basePath}/${currentPage - 1}`
    : null;

  const nextUrl = hasNext ? `${basePath}/${currentPage + 1}` : null;

  return { prevUrl, nextUrl };
}
