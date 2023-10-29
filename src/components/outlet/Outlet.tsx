import { Outlet as OutletPage } from 'react-router-dom';
import MarvelPage from '../marvelPage/MarvelPage';

const Outlet = () => {
  return (
    <>
      <MarvelPage />
      <OutletPage />
    </>
  );
};

export default Outlet;
