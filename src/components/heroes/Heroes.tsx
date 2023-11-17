import React, { useEffect } from 'react';
import './heroes.scss';
import Hero from '../hero/Hero';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  useFetchAllHeroesQuery,
  useFetchHeroQuery,
} from '../../services/HeroesService';
import { setTotalPage } from '../../store/reducers/heroesSlice';
import { Loader } from '../loader/Loader';

const Heroes: React.FC = () => {
  const { searchTerm, limit, offset } = useAppSelector((state) => state.heroes);
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useFetchAllHeroesQuery({
    limit: Math.abs(limit),
    offset,
  });
  const { data: hero, isLoading: loading } = useFetchHeroQuery(searchTerm);
  const results = data?.data?.results;
  const searchValue = hero?.data?.results;

  const totalPage = !searchTerm ? data && data.data.total - 1240 : 0;

  useEffect(() => {
    dispatch(setTotalPage(totalPage));
  }, [dispatch, totalPage]);

  const result = searchTerm ? searchValue : results;

  return (
    <>
      {isLoading || loading ? (
        <Loader />
      ) : !result || !result.length || isError ? (
        <h1 style={{ padding: '80px 50px 100px' }}>Heroes not found</h1>
      ) : (
        <div className="heroes">
          {result.map((hero) => (
            <Hero key={hero.id} {...hero} />
          ))}
        </div>
      )}
    </>
  );
};

export default Heroes;
