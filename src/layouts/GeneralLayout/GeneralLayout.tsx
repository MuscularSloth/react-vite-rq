import {Outlet} from 'react-router-dom';
import NavMenu from '../../components/NavMenu/NavMenu.tsx';

const GeneralLayout = () => {
  return (
    <>
      <NavMenu />
      <Outlet />
    </>
  );
};

export default GeneralLayout;
