import {Link} from 'react-router-dom';
import {PATHS} from '../../constants/paths.ts';
const NavMenu = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={PATHS.POST}>Posts</Link>
          </li>
          <li>
            <Link to={PATHS.PAGINATED_POST}>Paginated Post</Link>
          </li>
          <li>
            <Link to={PATHS.INFINITY_POST}>Infinity Posts</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavMenu;
