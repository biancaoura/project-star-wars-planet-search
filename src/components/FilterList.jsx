import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function FilterList() {
  const {
    numericFilter, removeFilterClick,
  } = useContext(PlanetContext);

  return (
    <ul>
      {
        numericFilter.filterByNumericValues
          .map(({ column, comparison, value }, index) => (
            <li key={ index }>
              <span>
                { column }
                {' '}
              </span>
              <span>
                { comparison }
                {' '}
              </span>
              <span>
                { value }
              </span>
              <button
                type="button"
                onClick={ () => removeFilterClick(column) }
              >
                X
              </button>
            </li>
          ))
      }
    </ul>
  );
}
