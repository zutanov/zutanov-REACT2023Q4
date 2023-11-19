import { Route, Routes } from 'react-router-dom';
import AllComics from './pages/comicsPage/ComicsPage';
import Outlet from './components/outlet/Outlet';
import NotFound from './pages/notFound/NotFound';

function App() {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="/comics/:id" element={<AllComics />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <div className="container__img"></div>
    </>
  );
}

export default App;
