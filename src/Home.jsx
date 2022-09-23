import React from 'react';
import FilterList from './components/FilterList';
import NameFilter from './components/NameFilter';
import NumericFilters from './components/NumericFilters';
import RemoveAllFiltersBtn from './components/RemoveAllFiltersBtn';
import SortList from './components/SortList';
import Table from './components/Table';

export default function Home() {
  return (
    <main>
      <NumericFilters />
      <SortList />
      <RemoveAllFiltersBtn />
      <NameFilter />
      <FilterList />
      <Table />
    </main>
  );
}
