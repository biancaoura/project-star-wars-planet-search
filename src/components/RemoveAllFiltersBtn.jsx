import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function RemoveAllFiltersBtn() {
  const { removeAllFiltersClick } = useContext(PlanetContext);

  return (
    <button
      type="button"
      onClick={ removeAllFiltersClick }
      className="filter-btn remove-all-button"
    >
      Remover todos
    </button>
  );
}
