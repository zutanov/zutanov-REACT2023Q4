import React from 'react';
import Search from '../../components/search/Search';
import Heroes from '../../components/heroes/Heroes';
import Pagination from '../../components/pagination/Pagination';

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
