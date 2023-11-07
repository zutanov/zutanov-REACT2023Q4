import React from 'react';
import Search from '../search/Search';
import Heroes from '../heroes/Heroes';
import Pagination from '../pagination/Pagination';

const MarvelPage: React.FC = () => {
  return (
    <>
      <Search />
      <Heroes />
      <Pagination />
    </>
  );
};

export default MarvelPage;
