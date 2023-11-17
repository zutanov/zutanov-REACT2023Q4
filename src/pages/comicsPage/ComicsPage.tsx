import './comicsPage.scss';
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Comics from '../../components/comics/Comics';
import { useFetchComicsQuery } from '../../services/HeroesService';
import { IComics } from '../../model/hero';
import { Loader } from '../../components/loader/Loader';

const ComicsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isError, isLoading, data } = useFetchComicsQuery(id);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLDivElement &&
      e.target.className === 'allcomics'
    ) {
      navigate(-1);
    }
  };

  const comics = data?.data.results as IComics[];

  if (isError) throw new Error('Comics error');

  return (
    <div className="allcomics" onClick={handleClose}>
      <div
        className="allcomics__layout"
        style={{
          right: id ? '0%' : '-33%',
        }}
      >
        <div className="allcomics__header">
          <h1>List of Comics</h1>
          <Link to="/" className="allcomics__btn">
            Back
          </Link>
        </div>
        {isLoading ? (
          <Loader />
        ) : !comics.length ? (
          <h2 className="allcomics__empty">There are no comics!</h2>
        ) : (
          <div className="allcomics__wrapper">
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
