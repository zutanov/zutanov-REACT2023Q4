import { Outlet as OutletPage } from 'react-router-dom';
import MarvelPage from '../../pages/marvelPage/MarvelPage';

const Outlet = () => {
  return (
    <>
      <MarvelPage />
      <OutletPage />
    </>
  );
};

export default Outlet;
