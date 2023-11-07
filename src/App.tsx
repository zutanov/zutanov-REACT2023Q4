import { Route, Routes } from 'react-router-dom';
import './App.css';
import AllComics from './components/comicsPage/ComicsPage';
import Outlet from './components/outlet/Outlet';
import Context from './components/provider/MarvelProvider';
import { ChangeEvent, useEffect, useState } from 'react';

export interface IPromise {
  limit: number;
  offset: number;
  results: IHero[];
  total: number;
}

export interface IHero {
  id: string;
  thumbnail: {
    path: string;
  };
  name: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [result, setResult] = useState<IHero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [pageQty, setPageQty] = useState(0);
  const [limit, setLimit] = useState(20);

  const handleSearch = async (
    query = 'offset=0',
    limit = 20
  ): Promise<IPromise> => {
    const baseURL = `https://gateway.marvel.com/v1/public/characters`;
    try {
      const response = await fetch(
        `${baseURL}?limit=${limit}&${query}&apikey=745c5a5a9b5aee2d133096deaf6e1260`
      ).then((res) => res.json());
      if (response.status !== 'Ok' || !response.data.results.length) {
        setError(true);
        throw new Error(response.statusText);
      }
      const { data } = await response;
      if (data.total > 100) {
        setPageQty(Math.ceil(100 / limit));
      }
      setResult(data.results);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // const handleSearch = async (query?: string, limit?: number) => {
  //   const { results } = await fetchData<IPromise>(query, limit);
  //   console.log(results);
  //   if (searchTerm && results[0].name) {
  //     localStorage.setItem('hero', JSON.stringify(searchTerm));
  //   }
  // };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const hero = localStorage.getItem('hero');
    const parse = hero ? JSON.parse(hero) : null;
    const query = parse ? `nameStartsWith=${parse}` : undefined;
    try {
      handleSearch(query);
      if (query) setPageQty(0);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }, []);

  const setHeroesLimit = async (n: number) => {
    setLimit(n);
  };

  const setPage = (n: number) => {
    setPageQty(n);
  };

  return (
    <Context.Provider
      value={{
        result,
        loading,
        pageQty,
        searchTerm,
        error,
        limit,
        handleSearch,
        handleInputChange,
        setPage,
        setHeroesLimit,
      }}
    >
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="comics/:id" element={<AllComics />} />
        </Route>
      </Routes>
    </Context.Provider>
  );
}

export default App;
