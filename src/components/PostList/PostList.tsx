import React from 'react';
import {Post} from '../../helpers/axios/useRequestPosts.ts';

type PostListProps = {
  posts?: Post[];
};
const PostList: React.FC<PostListProps> = ({posts}) => {
  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          {/*<p>{post.body}</p>*/}
        </li>
      ))}
    </ul>
  );
};

export default PostList;
