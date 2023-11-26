import React, { useEffect } from 'react';
import styles from '../../styles/heroes.module.scss';
import Hero from '../hero/Hero';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useFetchAllHeroesQuery } from '../../services/HeroesService';
import { setTotalPage } from '../../store/reducers/heroesSlice';
import { Loader } from '../loader/Loader';

const Heroes: React.FC = () => {
  const { limit, offset } = useAppSelector((state) => state.heroes);
  const { searchTerm } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const { isLoading, isError, data } = useFetchAllHeroesQuery({
    limit: Math.abs(limit),
    offset,
    search: searchTerm,
  });

  const result = data?.data?.results;

  const totalPage = !searchTerm ? data && data.data.total - 1240 : 0;

  useEffect(() => {
    dispatch(setTotalPage(totalPage));
  }, [dispatch, totalPage]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !result || !result.length || isError ? (
        <h1 style={{ padding: '80px 50px 100px' }}>Heroes not found</h1>
      ) : (
        <div className={styles.heroes}>
          {result.map((hero) => (
            <Hero key={hero.id} {...hero} />
          ))}
        </div>
      )}
    </>
  );
};

export default Heroes;
