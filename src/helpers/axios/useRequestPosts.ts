import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {axiosClient} from './generalApiSettings.ts';

export type PaginatedPost = {
  posts: Post[];
  totalCount: number;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
export const fetchPostList = async (): Promise<PaginatedPost> => {
  const res = await axiosClient.get<Post[]>('/posts');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const totalCount: number = res?.headers?.get('X-Total-Count');
  return {posts: res.data, totalCount};
};

export function useRequestPosts() {
  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function query(key: any, queryFunction: any, options = {}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<PaginatedPost>({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function mutate(key: any, mutationFunction: any, options = {}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () => queryClient.invalidateQueries(key),
      ...options,
    });
  }

  return {query, mutate};
}
