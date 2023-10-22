import {Outlet} from 'react-router-dom';
import NavMenu from '../../components/NavMenu/NavMenu.tsx';

const GeneralLayout = () => {
  return (
    <>
      <NavMenu />
      <hr />
      <Outlet />
    </>
  );
};

export default GeneralLayout;
