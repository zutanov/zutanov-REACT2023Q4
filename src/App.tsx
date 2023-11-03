import { Route, Routes } from 'react-router-dom';
import './App.css';
import AllComics from './components/comicsPage/ComicsPage';
import Outlet from './components/outlet/Outlet';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="comics/:id" element={<AllComics />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
