import React from 'react';
import FilterList from './components/FilterList';
import NameFilter from './components/NameFilter';
import NumericFilters from './components/NumericFilters';
import RemoveAllFiltersBtn from './components/RemoveAllFiltersBtn';
import Table from './components/Table';

export default function Home() {
  return (
    <main>
      <NumericFilters />
      <RemoveAllFiltersBtn />
      <NameFilter />
      <FilterList />
      <Table />
    </main>
  );
}
