import React from 'react';
import FilterList from './components/FilterList';
import Header from './components/Header';
import NameFilter from './components/NameFilter';
import NumericFilters from './components/NumericFilters';
import RemoveAllFiltersBtn from './components/RemoveAllFiltersBtn';
import SortList from './components/SortList';
import Table from './components/Table';

export default function Home() {
  return (
    <main className="home">
      <Header />
      <NumericFilters />
      <SortList />
      <RemoveAllFiltersBtn />
      <NameFilter />
      <FilterList />
      <Table />
    </main>
  );
}
