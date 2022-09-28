import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import { COLUMN_OPTIONS } from '../helpers';

export default function SortList() {
  const { handleSorting, handleSortingClick, order } = useContext(PlanetContext);

  const { sortBy } = order;

  return (
    <form className="numeric-sort-container">

      <label htmlFor="sortBy" className="input-container">
        Ordenar por

        <select
          name="sortBy"
          id="sortBy"
          value={ sortBy }
          onChange={ handleSorting }
          className="input-element"
        >
          { COLUMN_OPTIONS.map((option) => (
            <option value={ option } key={ option }>{option}</option>
          )) }
        </select>
      </label>

      <div className="radio-container">
        <label htmlFor="ASC" className="input-container">
          <input
            type="radio"
            name="direction"
            id="ASC"
            value="ASC"
            onChange={ handleSorting }
            className="radio"
          />
          Ascendente
        </label>
        <label htmlFor="DESC" className="input-container">
          <input
            type="radio"
            name="direction"
            id="DESC"
            value="DESC"
            onChange={ handleSorting }
            className="radio"
          />
          Descendente
        </label>
      </div>

      <button
        type="button"
        onClick={ handleSortingClick }
        className="filter-btn"
      >
        Ordenar
      </button>

    </form>
  );
}
