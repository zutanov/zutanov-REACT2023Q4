import { IHero } from '../App';

import { ChangeEvent, createContext } from 'react';

interface IContext {
  result: IHero[];
  loading?: boolean;
  pageQty: number;
  searchTerm?: string;
  limit: number;
  error?: boolean;
  handleSearch: (query?: string, limit?: number) => void;
  setHeroesLimit: (n: number) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setPage: (n: number) => void;
}

const Context = createContext<IContext>({
  result: [],
  loading: false,
  pageQty: 0,
  searchTerm: '',
  limit: 20,
  error: false,
  handleSearch: () => {},
  setHeroesLimit: () => {},
  handleInputChange: () => {},
  setPage: () => {},
});

export default Context;
