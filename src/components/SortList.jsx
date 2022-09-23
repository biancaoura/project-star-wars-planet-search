import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import { COLUMN_OPTIONS } from '../helpers';

export default function SortList() {
  const { handleSorting, handleSortingClick, order } = useContext(PlanetContext);

  const { sortBy } = order;

  return (
    <form>

      <label htmlFor="sortBy">
        Ordenar por

        <select
          name="sortBy"
          id="sortBy"
          value={ sortBy }
          onChange={ handleSorting }
          data-testid="column-sort"
        >
          { COLUMN_OPTIONS.map((option) => (
            <option value={ option } key={ option }>{option}</option>
          )) }
        </select>
      </label>

      <label htmlFor="ASC">
        <input
          type="radio"
          name="direction"
          id="ASC"
          value="ASC"
          onChange={ handleSorting }
          data-testid="column-sort-input-asc"
        />

        Ascendente
      </label>

      <label htmlFor="DESC">
        <input
          type="radio"
          name="direction"
          id="DESC"
          value="DESC"
          onChange={ handleSorting }
          data-testid="column-sort-input-desc"
        />

        Descendente
      </label>

      <button
        type="button"
        onClick={ handleSortingClick }
        data-testid="column-sort-button"
      >
        Ordenar
      </button>

    </form>
  );
}
