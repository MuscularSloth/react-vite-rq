import {Pagination} from '@mui/material';
import React, {useEffect, useLayoutEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import PostList from '../../components/PostList/PostList.tsx';
import {fetchPaginatedPostList} from '../../helpers/axios/fetchFunctions.ts';
import {useRequestPosts} from '../../helpers/axios/useRequestPosts.ts';

const PaginationPostListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const limitSearchParams = Number(searchParams.get('_limit')) || 10;
  const pageSearchParams = Number(searchParams.get('_page')) || 1;

  const [page, setPage] = React.useState(pageSearchParams);
  const [limit, setLimit] = React.useState(limitSearchParams);

  useEffect(() => {
    if (page !== pageSearchParams || limit !== limitSearchParams) {
      setSearchParams({_limit: String(limit), _page: String(page)});
    }
  }, [limit, page, searchParams]);

  useLayoutEffect(() => {
    if (page !== pageSearchParams) {
      setPage(pageSearchParams);
    }

    if (limit !== limitSearchParams) {
      setLimit(limitSearchParams);
    }
  }, []);

  // console.log({limit, page});

  const {query} = useRequestPosts();

  const {data, isLoading, isError, isFetching} = query(
    ['posts-pagination', limit, page],
    () => fetchPaginatedPostList(limit, page),
    {
      enabled: true,
      cacheTime: 1000 * 60 * 60,
    },
  );

  const {totalCount, posts} = data || {};
  const totalPages = totalCount ? totalCount / limit : 1;

  if (isError) return <p>Error :(</p>;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <PostList posts={posts} isLoading={isFetching} />
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        size="small"
        shape="rounded"
        disabled={isLoading}
      />
    </>
  );
};

export default PaginationPostListPage;
