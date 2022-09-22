import React from 'react';
import AppliedFilters from './components/AppliedFilters';
import NameFilter from './components/NameFilter';
import NumericFilters from './components/NumericFilters';
import Table from './components/Table';

export default function Home() {
  return (
    <div>
      <NumericFilters />
      <NameFilter />
      <AppliedFilters />
      <Table />
    </div>
  );
}
