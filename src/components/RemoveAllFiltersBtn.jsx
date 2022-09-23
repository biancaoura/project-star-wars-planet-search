import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function RemoveAllFiltersBtn() {
  const { removeAllFiltersClick } = useContext(PlanetContext);

  return (
    <button
      type="button"
      onClick={ removeAllFiltersClick }
      data-testid="button-remove-filters"
    >
      Remover todos
    </button>
  );
}
