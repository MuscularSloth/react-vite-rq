import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {PaginatedPost} from './fetchFunctions.ts';

export function useRequestPosts() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function query(key: (string | number)[], queryFunction: any, options = {}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<PaginatedPost>({
      queryKey: key,
      queryFn: queryFunction,
      placeholderData: keepPreviousData,
      ...options,
    });
  }

  return {query};
}
