import {Divider, List, ListItem, ListItemText, Skeleton} from '@mui/material';
import React from 'react';
import {Post} from '../../helpers/axios/useRequestPosts.ts';

type PostListProps = {
  posts?: Post[];
  isLoading?: boolean;
};
const PostList: React.FC<PostListProps> = ({posts, isLoading}) => {
  const getPlaceholders = () => {
    const placeholders = [];

    const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

    for (let i = 0; i < 10; i++) {
      placeholders.push(
        <>
          <ListItem key={i}>
            <ListItemText
              primary={<Skeleton variant="text" sx={{fontSize: '0.875rem'}} />}
              secondary={
                <>
                  <Skeleton variant="text" sx={{fontSize: '0.875rem'}} />
                  <Skeleton
                    variant="text"
                    sx={{fontSize: '0.875rem', width: getRandom(30, 80) + '%'}}
                  />
                </>
              }
            />
          </ListItem>
          <Divider component="li" />
        </>,
      );
    }

    return placeholders;
  };

  if (isLoading) return <List dense={true}>{getPlaceholders()}</List>;

  return (
    <List dense={true}>
      {posts?.map((post) => (
        <>
          <ListItem key={post.id}>
            <ListItemText primary={post.title} secondary={post.body} />
          </ListItem>
          <Divider component="li" />
        </>
      ))}
    </List>
  );
};

export default PostList;
