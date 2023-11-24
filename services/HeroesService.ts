import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IComics, IHero, IPromise } from '../model/hero';
import { HYDRATE } from 'next-redux-wrapper';

interface IParams {
  limit: number;
  offset?: number;
}
interface MarvelPromise<T> {
  data: IPromise<T>;
}

export const marvelApi = createApi({
  reducerPath: 'marvelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gateway.marvel.com/v1/public',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    fetchAllHeroes: builder.query<MarvelPromise<IHero[]>, IParams>({
      query: ({ limit = 21, offset = 1240 }) => ({
        url: `/characters`,
        params: {
          apikey: '745c5a5a9b5aee2d133096deaf6e1260',
          limit,
          offset,
        },
      }),
    }),
    fetchHero: builder.query<MarvelPromise<IHero[]>, string>({
      query: (name) => ({
        url: `/characters`,
        params: {
          apikey: '745c5a5a9b5aee2d133096deaf6e1260',
          nameStartsWith: name,
        },
      }),
    }),
    fetchComics: builder.query<MarvelPromise<IComics[]>, string | undefined>({
      query: (id) => ({
        url: `/characters/${id?.slice(1)}/comics`,
        params: {
          apikey: '745c5a5a9b5aee2d133096deaf6e1260',
          limit: 9,
        },
      }),
    }),
  }),
});

export const {
  useFetchAllHeroesQuery,
  useFetchHeroQuery,
  useFetchComicsQuery,
  util: { getRunningQueriesThunk },
} = marvelApi;

export const { fetchAllHeroes, fetchHero, fetchComics } = marvelApi.endpoints;
