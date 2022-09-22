import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function NameFilter() {
  const {
    filterByName: { name }, setFilterByName, setNumericFilter, data,
  } = useContext(PlanetContext);

  const handleFilters = ({ target: { value } }) => {
    setFilterByName((prevState) => ({ ...prevState, name: value }));
    setNumericFilter((prevState) => ({
      ...prevState,
      appliedFilter: data.filter((planet) => planet.name.toLowerCase().includes(value)),
    }));
  };

  return (
    <label htmlFor="name-filter">
      Planet name
      <input
        type="text"
        value={ name }
        id="name-filter"
        onChange={ handleFilters }
        data-testid="name-filter"
      />
    </label>
  );
}
