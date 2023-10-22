import {fetchPostList, useRequestPosts} from '../../helpers/axios/useRequestPosts.ts';

const PostList = () => {
  const {query} = useRequestPosts();

  const {
    data: posts,
    isLoading,
    isError,
  } = query(['posts'], fetchPostList, {
    enabled: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error :(</p>;

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
