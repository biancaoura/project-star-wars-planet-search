import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function NameFilter() {
  const {
    handleNameChange, filterByName,
  } = useContext(PlanetContext);

  const { name } = filterByName;

  return (
    <label htmlFor="name-filter">
      Planet name
      <input
        type="text"
        value={ name }
        id="name-filter"
        onChange={ handleNameChange }
      />
    </label>
  );
}
