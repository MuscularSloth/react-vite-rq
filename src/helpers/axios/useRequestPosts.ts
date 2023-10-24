import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {AxiosHeaders, AxiosHeaderValue} from 'axios';
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

export const fetchPaginatedPostList = async (
  _limit: number,
  _page: number,
): Promise<PaginatedPost> => {
  try {
    const res = await axiosClient.get<Post[]>('/posts', {
      params: {
        _limit,
        _page,
      },
    });

    const headers = res.headers;
    const headerTotalCount: string | false | undefined =
      headers instanceof AxiosHeaders &&
      headers.has('X-Total-Count') &&
      headers.get('X-Total-Count')?.toString();

    const totalCount: number = Number(headerTotalCount) || 1;

    if (res.data) {
      return {posts: res.data, totalCount};
    } else {
      throw new Error('Response data is null or undefined');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export function useRequestPosts() {
  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function query(key: (string | number)[], queryFunction: any, options = {}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<PaginatedPost>({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function mutate(key: (string | number)[], mutationFunction: any, options = {}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () => queryClient.invalidateQueries({queryKey: key}),
      ...options,
    });
  }

  return {query, mutate};
}
