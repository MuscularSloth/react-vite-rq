import {Link, useLocation} from 'react-router-dom';

type PostPaginationProps = {
  currentPage: number;
  totalPosts: number;
  postPerPage: number;
};
const PostPagination: React.FC<PostPaginationProps> = ({
  currentPage,
  totalPosts,
  postPerPage,
}) => {
  const pagesAmount = Math.ceil(totalPosts / postPerPage);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const renderPageLinks = () => {
    const pageLinks = [];

    for (let i = 1; i <= pagesAmount; i++) {
      const updatedQueryParams = new URLSearchParams(queryParams.toString());
      updatedQueryParams.set('_page', String(i));
      updatedQueryParams.set('_limit', String(postPerPage));

      if (i === currentPage) {
        pageLinks.push(
          <li key={i} style={{marginLeft: '5px'}}>
            <b>{i}</b>
          </li>,
        );
      } else {
        pageLinks.push(
          <li key={i} style={{marginLeft: '5px'}}>
            <Link to={`?${updatedQueryParams.toString()}`}>{i}</Link>
          </li>,
        );
      }
    }

    return pageLinks;
  };

  return (
    <>
      <ul style={{display: 'flex', listStyle: 'none'}}>{renderPageLinks()}</ul>
    </>
  );
};

export default PostPagination;
