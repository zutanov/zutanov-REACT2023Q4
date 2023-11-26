import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IComics, IHero, IPromise } from '../model/hero';
import { HYDRATE } from 'next-redux-wrapper';
import { md5 } from 'js-md5';

const PUBLIC_KEY = '745c5a5a9b5aee2d133096deaf6e1260';
const PRIVATE_KEY = '6b950140c03f1c94d04051c9ef8bc58d6b63b0dd';

const ts = Number(new Date());
const hash = md5.create();
hash.update(ts + PRIVATE_KEY + PUBLIC_KEY);

interface IParams {
  limit: number;
  offset?: number;
  search?: string;
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
      query: ({ limit = 21, offset = 1240, search }) => {
        const baseParams = {
          apikey: PUBLIC_KEY,
          hash: hash.hex(),
          ts,
        };

        const params = search
          ? { ...baseParams, nameStartsWith: search }
          : { ...baseParams, limit, offset };

        return {
          url: `/characters`,
          params,
        };
      },
    }),
    fetchComics: builder.query<MarvelPromise<IComics[]>, string | undefined>({
      query: (id) => ({
        url: `/characters/${id?.slice(1)}/comics`,
        params: {
          apikey: PUBLIC_KEY,
          limit: 9,
          hash: hash.hex(),
          ts,
        },
      }),
    }),
  }),
});

export const {
  useFetchAllHeroesQuery,
  useFetchComicsQuery,
  util: { getRunningQueriesThunk },
} = marvelApi;

export const { fetchAllHeroes, fetchComics } = marvelApi.endpoints;
