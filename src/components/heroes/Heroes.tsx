import React from 'react';
import './heroes.scss';
import Hero from '../hero/Hero';
import { IState } from '../marvelPage/MarvelPage';

const Heroes: React.FC<Omit<IState, 'searchTerm'>> = ({
  results,
  loading,
  error,
}) => {
  return (
    <div className="heroes">
      {loading ? <p>Loading...</p> : <Hero results={results} error={error} />}
    </div>
  );
};

export default Heroes;
