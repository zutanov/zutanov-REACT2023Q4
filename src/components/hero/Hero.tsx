import React, { useContext } from 'react';
import './hero.scss';
import { Link } from 'react-router-dom';
import Context from '../../context/MarvelProvider';

const Hero: React.FC = () => {
  const { result, error } = useContext(Context);
  if (!result || error) {
    throw new Error('Data is not found');
  }
  return (
    <>
      {result.map(({ id, name, thumbnail }) => {
        return (
          <div className="hero" key={id}>
            <div className="hero__wrapper">
              <img src={thumbnail.path + '/portrait_xlarge.jpg'} alt={name} />
            </div>
            <div className="hero__wrapper">
              <h4 className="hero__title">{name}</h4>
              <Link to={`comics/:${id}`}>Show comics</Link>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Hero;
