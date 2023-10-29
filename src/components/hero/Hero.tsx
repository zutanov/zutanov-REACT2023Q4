import React from 'react';
import './hero.scss';
import { IHero } from '../marvelPage/MarvelPage';
import { Link } from 'react-router-dom';

interface IResult {
  results: IHero[];
  error: boolean;
}

const Hero: React.FC<IResult> = (props) => {
  const { results, error } = props;
  console.log(results);
  if (!results || error) {
    throw new Error('Data is not found');
  }
  return (
    <>
      {results.map(({ id, name, thumbnail }) => {
        return (
          <div className="hero" key={id}>
            <div className="hero__wrapper">
              <img src={thumbnail.path + '/portrait_xlarge.jpg'} alt={name} />
            </div>
            <div className="hero__wrapper">
              <h4 className="hero__title">{name}</h4>
              <Link to={`/comics/:${id}`}>Show comics</Link>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Hero;
