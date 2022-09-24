import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function RemoveAllFiltersBtn() {
  const { removeAllFiltersClick } = useContext(PlanetContext);

  return (
    <button
      type="button"
      onClick={ removeAllFiltersClick }
    >
      Remover todos
    </button>
  );
}
