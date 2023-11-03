import React from 'react';
import { IComicsState } from '../comicsPage/ComicsPage';
import './comics.scss';

const Comics: React.FC<IComicsState> = ({ comics }) => {
  const imgNotFoundUrl =
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_xlarge.jpg';
  return (
    <>
      {comics.map(({ id, title, thumbnail }) => {
        return (
          <div key={id} className="comics">
            <img
              className="comics__img"
              src={
                thumbnail.path
                  ? thumbnail.path + '/portrait_xlarge.jpg'
                  : imgNotFoundUrl
              }
              alt={title}
            />
            <h4 className="comics__title">{title}</h4>
          </div>
        );
      })}
    </>
  );
};

export default Comics;
