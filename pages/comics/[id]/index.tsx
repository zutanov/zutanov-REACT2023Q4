import styles from '../../../styles/comics.module.scss';
import React from 'react';
import Comics from '../../../components/comics/Comics';
import { IComics } from '../../../model/hero';
import { Loader } from '../../../components/loader/Loader';
import { useRouter } from 'next/router';
import {
  useFetchComicsQuery,
  getRunningQueriesThunk,
  fetchComics,
} from '../../../services/HeroesService';
import { wrapper } from '../../../store/store';

const ComicsPage = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { isError, isLoading, data } = useFetchComicsQuery(id as string);

  const handleClose = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    if (
      (e.target instanceof HTMLDivElement &&
        e.target.className === styles.allcomics) ||
      e.target instanceof HTMLButtonElement
    ) {
      router.push('/');
    }
  };

  const comics = data?.data.results as IComics[];

  if (isError) throw new Error('Comics error');

  return (
    <div className={styles.allcomics} onClick={handleClose}>
      <div
        className={styles.allcomics__layout}
        style={{
          right: id ? '0%' : '-33%',
        }}
      >
        <div className={styles.allcomics__header}>
          <h1>List of Comics</h1>
          <button onClick={handleClose} className={styles.allcomics__btn}>
            Back
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : !comics.length ? (
          <h2 className={styles.allcomics__empty}>There are no comics!</h2>
        ) : (
          <div className={styles.allcomics__wrapper}>
            {comics.map((item) => (
              <Comics key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicsPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context?.params?.id;

    const response = await store.dispatch(
      fetchComics.initiate(id?.slice(1) as string)
    );
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    console.log(response + 'res');
    return {
      props: {},
    };
  }
);
