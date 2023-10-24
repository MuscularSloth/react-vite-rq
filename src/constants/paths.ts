export const PATHS = {
  POST: '/',
  PAGINATED_POST: '/paginated-posts',
  INFINITY_POST: '/infinity-posts',
};

export type PathsKeys = keyof typeof PATHS;
export type PathsTerms<T> = Record<PathsKeys, T>;

export const pageNameByPath: PathsTerms<string> = {
  POST: 'Post',
  PAGINATED_POST: 'Paginated Posts',
  INFINITY_POST: 'Infinity Posts',
};
