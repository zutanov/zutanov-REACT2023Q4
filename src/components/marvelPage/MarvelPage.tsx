import React, { ChangeEvent, useEffect, useState } from 'react';
import Search from '../search/Search';
import Heroes from '../heroes/Heroes';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

interface IPromise {
  results: IHero[];
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

const MarvelPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [result, setResult] = useState<IHero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async <T,>(query = 'limit=20&offset=200'): Promise<T> => {
    const baseURL = 'https://gateway.marvel.com/v1/public/characters?';
    try {
      const request = await fetch(
        `${baseURL}${query}&apikey=745c5a5a9b5aee2d133096deaf6e1260`
      );
      const response = await request.json();
      if (response.status !== 'Ok' || !response.data.results.length) {
        setError(true);
        throw new Error(response.statusText);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSearch = async (query?: string) => {
    const { results } = await fetchData<IPromise>(query);
    setResult(results);
    setLoading(false);
    if (searchTerm && results[0].name) {
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
      handleSearch(query);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }, []);

  return (
    <>
      <Search
        search={searchTerm}
        handleSearch={handleSearch}
        handleInputChange={handleInputChange}
      />
      <ErrorBoundary>
        <Heroes error={error} results={result} loading={loading} />
      </ErrorBoundary>
    </>
  );
};

export default MarvelPage;
