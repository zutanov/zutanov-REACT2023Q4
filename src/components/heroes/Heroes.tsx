import React, { useContext } from 'react';
import './heroes.scss';
import Hero from '../hero/Hero';
import Context from '../provider/MarvelProvider';

const Heroes: React.FC = () => {
  const { loading } = useContext(Context);
  return <div className="heroes">{loading ? <p>Loading...</p> : <Hero />}</div>;
};

export default Heroes;
