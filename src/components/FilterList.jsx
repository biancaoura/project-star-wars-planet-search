import React, { useContext } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PlanetContext from '../context/PlanetContext';

export default function FilterList() {
  const {
    numericFilter, removeFilterClick,
  } = useContext(PlanetContext);

  return (
    <ul className="filter-list-container">
      {
        numericFilter.filterByNumericValues
          .map(({ column, comparison, value }, index) => (
            <li key={ index } className="filter-list-item">
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
                className="remove-filter-btn"
              >
                <FontAwesomeIcon icon={ faXmark } />
              </button>
            </li>
          ))
      }
    </ul>
  );
}
