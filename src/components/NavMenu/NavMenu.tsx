import {Link} from 'react-router-dom';
import {pageNameByPath, PATHS, PathsKeys} from '../../constants/paths.ts';
import {AppBar, Toolbar, Button} from '@mui/material';
const NavMenu = () => {
  const pages: PathsKeys[] = Object.keys(PATHS) as PathsKeys[];

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          {pages.map((page) => (
            <Button
              key={page}
              component={Link}
              to={PATHS[page]}
              sx={{my: 2, color: 'white', display: 'block'}}
              size="small"
            >
              {pageNameByPath[page]}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavMenu;
