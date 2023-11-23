export interface IHero {
  id: string;
  thumbnail: {
    path: string;
  };
  name: string;
}

export interface IPromise<T> {
  limit: number;
  offset: number;
  results: T;
  total: number;
}

export interface IComics {
  id: string;
  thumbnail: {
    path: string;
  };
  title: string;
}
