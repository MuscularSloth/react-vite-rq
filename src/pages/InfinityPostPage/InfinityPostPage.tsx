import {
  Box,
  Button,
  Container,
  ContainerProps,
  Divider,
  ListItem,
  ListItemText,
} from '@mui/material';
import React from 'react';
import {FixedSizeList} from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import {fetchInfinitePostList, Post} from '../../helpers/axios/fetchFunctions.ts';
import {useInfinityRequestPosts} from '../../helpers/axios/useInfinityRequestPosts.tsx';

const InfinityPostPage = () => {
  const {query} = useInfinityRequestPosts();

  const {data, fetchNextPage} = query(['posts-infinite'], fetchInfinitePostList, {
    enabled: true,
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    networkMode: 'offlineFirst',
  });

  const allPosts = data?.pages?.reduce<Post[]>((acc, page) => {
    return [...acc, ...page.posts];
  }, [] as Post[]);
  const itemCount = allPosts?.length ?? 0;

  const totalCount = data?.pages?.[0]?.totalCount ?? 0;

  const isItemLoaded = (index: number) => index < itemCount;
  // const loadMoreItems = isFetchingNextPage ? () => {} : fetchNextPage;
  const ListContainer = (props: ContainerProps) => {
    return <Container maxWidth="sm" {...props} />;
  };

  const handleFetchMore = async () => {
    console.log('launch fetch');
    await fetchNextPage();
  };

  return (
    <Box height="80vh" display="flex" flexDirection="column">
      <AutoSizer>
        {({height, width}) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={totalCount}
            loadMoreItems={handleFetchMore}
          >
            {({onItemsRendered, ref}) => (
              <FixedSizeList
                className="List"
                height={height}
                width={width}
                itemCount={totalCount}
                itemSize={100}
                itemData={data}
                innerElementType={ListContainer}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {({index, style}) => (
                  <span key={index} style={style}>
                    <ListItem>
                      <ListItemText
                        primary={allPosts?.[index]?.title ?? 'Loading...'}
                        secondary={allPosts?.[index]?.body ?? 'Loading...'}
                      />
                    </ListItem>
                    <Divider />
                  </span>
                )}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </Box>
  );
};

export default InfinityPostPage;
