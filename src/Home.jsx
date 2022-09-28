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
      <div className="filter-container">
        <NameFilter />
        <div className="filter-numeric-sort-container">
          <NumericFilters />
          <div className="line" />
          <SortList />
        </div>
        <RemoveAllFiltersBtn />
      </div>
      <FilterList />
      <Table />
    </main>
  );
}
