import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function AppliedFilters() {
  const { numericFilter } = useContext(PlanetContext);
  return (
    <div>
      <ul>
        {
          numericFilter.filterByNumericValues
            .map(({ column, comparison, value }, index) => (
              <li key={ index } data-testid="filter">
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
                <button type="button">
                  X
                </button>
              </li>
            ))
        }
      </ul>

    </div>
  );
}
