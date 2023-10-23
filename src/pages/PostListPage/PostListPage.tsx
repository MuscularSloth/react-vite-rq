import PostList from '../../components/PostList/PostList.tsx';
import {fetchPostList, useRequestPosts} from '../../helpers/axios/useRequestPosts.ts';

const PostListPage = () => {
  const {query} = useRequestPosts();

  const {data, isLoading, isError} = query(['posts'], fetchPostList, {
    enabled: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error :(</p>;

  const {posts} = data || {};

  return (
    <>
      <PostList posts={posts} />
    </>
  );
};

export default PostListPage;
