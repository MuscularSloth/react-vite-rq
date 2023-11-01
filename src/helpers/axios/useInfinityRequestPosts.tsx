import {useInfiniteQuery} from '@tanstack/react-query';
import {PaginatedPost} from './fetchFunctions.ts';

export function useInfinityRequestPosts() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function query(key: (string | number)[], queryFunction: any, options = {}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useInfiniteQuery<PaginatedPost>({
      queryKey: key,
      queryFn: queryFunction,
      initialPageParam: {postsPerPage: 10, previousPage: 1},
      getNextPageParam: (lastPage) => {
        console.log('getNextPageParam >>> ', {lastPage});
        const {totalCount, postsPerPage = 10, previousPage = 1} = lastPage;
        const totalPages = Math.ceil(totalCount / postsPerPage);

        if (previousPage === totalPages) {
          return undefined;
        }
        return {previousPage: previousPage + 1, postsPerPage};
      },
      getPreviousPageParam: (firstPage) => {
        const {previousPage = 1, postsPerPage = 10} = firstPage;

        if (previousPage <= 1) {
          return undefined;
        }
        return {previousPage: previousPage - 1, postsPerPage};
      },
      ...options,
    });
  }

  return {query};
}
