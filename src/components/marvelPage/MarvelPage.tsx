import React, { ChangeEvent, useEffect, useState } from 'react';
import Search from '../search/Search';
import Heroes from '../heroes/Heroes';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import Pagination from '../pagination/Pagination';

interface IPromise {
  data: {
    count: number;
    limit: number;
    offset: number;
    results: IHero[];
    total: number;
  };
}

export interface IHero {
  id: string;
  thumbnail: {
    path: string;
  };
  name: string;
}

export interface IState {
  loading: boolean;
  results: IHero[];
  searchTerm: string;
  error: boolean;
}

interface IData {
  results: IHero[];
}

const MarvelPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [result, setResult] = useState<IData>({ results: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [pageQty, setPageQty] = useState(0);
  const [limit, setLimit] = useState(20);
  const fetchData = async <T,>(query = 'offset=0', limit = 20): Promise<T> => {
    const baseURL = `https://gateway.marvel.com/v1/public/characters`;
    try {
      const response = await fetch(
        `${baseURL}?limit=${limit}&${query}&apikey=745c5a5a9b5aee2d133096deaf6e1260`
      ).then((res) => res.json());
      if (response.status !== 'Ok' || !response.data.results.length) {
        setError(true);
        throw new Error(response.statusText);
      }
      const { data } = response;
      setResult(data);
      setLoading(false);
      console.log(data);
      if (data.total > 100) {
        setPageQty(100 / limit);
      } else if (data.total > limit) {
        setPageQty(data.total / limit);
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSearch = async (query?: string, limit?: number) => {
    const { data } = await fetchData<IPromise>(query, limit);
    if (searchTerm && data.results[0].name) {
      localStorage.setItem('hero', JSON.stringify(searchTerm));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const hero = localStorage.getItem('hero');
    const parse = hero ? JSON.parse(hero) : null;
    const query = parse ? `nameStartsWith=${parse}` : undefined;
    try {
      handleSearch(query, limit);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }, [limit]);

  return (
    <>
      <Search
        search={searchTerm}
        handleSearch={handleSearch}
        handleInputChange={handleInputChange}
      />
      <ErrorBoundary>
        <Heroes error={error} results={result.results} loading={loading} />
      </ErrorBoundary>
      {pageQty > 1 && (
        <Pagination
          pages={pageQty}
          handleSearch={handleSearch}
          limit={limit}
          setLimit={setLimit}
        />
      )}
    </>
  );
};

export default MarvelPage;
