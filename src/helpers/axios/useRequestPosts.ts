import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {axiosClient} from './generalApiSettings.ts';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
export const fetchPostList = () =>
  axiosClient.get<Post[]>('/posts').then((res) => res.data);

export function useRequestPosts() {
  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function query(key: any, queryFunction: any, options = {}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<Post[]>({
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
