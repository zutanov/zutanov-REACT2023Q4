import React from 'react';
import { IComicsState } from '../comicsPage/ComicsPage';
import './comics.scss';

const Comics: React.FC<IComicsState> = ({ comics }) => {
  return (
    <>
      {comics.map(({ id, title, thumbnail }) => {
        return (
          <div key={id} className="comics">
            <img
              className="comics__img"
              src={thumbnail.path + '/portrait_xlarge.jpg'}
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
