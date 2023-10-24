import {Divider, List, ListItem, ListItemText, Skeleton} from '@mui/material';
import React from 'react';
import {Post} from '../../helpers/axios/fetchFunctions.ts';

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
        <React.Fragment key={i}>
          <ListItem>
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
        </React.Fragment>,
      );
    }

    return placeholders;
  };

  if (isLoading) return <List dense={true}>{getPlaceholders()}</List>;

  return (
    <List dense={true}>
      {posts?.map((post) => (
        <React.Fragment key={post.id}>
          <ListItem>
            <ListItemText primary={post.title} secondary={post.body} />
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default PostList;
