import React, { useContext } from 'react';
import './heroes.scss';
import Hero from '../hero/Hero';
import Context from '../../context/MarvelProvider';

const Heroes: React.FC = () => {
  const { loading, result } = useContext(Context);
  return (
    <div className="heroes">
      {loading ? (
        <p>Loading...</p>
      ) : !result || !result.length ? (
        <p>Heroes not found</p>
      ) : (
        <Hero />
      )}
    </div>
  );
};

export default Heroes;
