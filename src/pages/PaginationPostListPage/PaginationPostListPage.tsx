import {useSearchParams} from 'react-router-dom';
import PostList from '../../components/PostList/PostList.tsx';
import {
  PaginatedPost,
  Post,
  useRequestPosts,
} from '../../helpers/axios/useRequestPosts.ts';
import PostPagination from '../../components/PostPagination/PostPagination.tsx';
import {axiosClient} from '../../helpers/axios/generalApiSettings.ts';

const PaginationPostListPage = () => {
  const [
    searchParams,
    //setSearchParams
  ] = useSearchParams();

  const limit = Number(searchParams.get('_limit')) || 10;
  const page = Number(searchParams.get('_page')) || 1;

  console.log({limit, page});

  const fetchPaginatedPostList = async (
    _limit: number,
    _page: number,
  ): Promise<PaginatedPost> => {
    const res = await axiosClient.get<Post[]>('/posts', {
      params: {
        _limit,
        _page,
      },
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const totalCount: number = res?.headers?.get('X-Total-Count');
    return {posts: res.data, totalCount};
  };

  const {query} = useRequestPosts();

  const {data, isLoading, isError} = query(
    ['posts', limit, page],
    () => fetchPaginatedPostList(limit, page),
    {
      enabled: true,
      cacheTime: 1000 * 60 * 60,
    },
  );

  const {totalCount, posts} = data || {};

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error :(</p>;

  return (
    <>
      <PostList posts={posts} />
      <PostPagination
        currentPage={page}
        totalPosts={totalCount ?? 0}
        postPerPage={limit}
      />
    </>
  );
};

export default PaginationPostListPage;
