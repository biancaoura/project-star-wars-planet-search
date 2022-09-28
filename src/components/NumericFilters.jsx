import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import { COLUMN_OPTIONS, COMPARISON } from '../helpers';

export default function NumericFilters() {
  const {
    numericFilter, handleInputFilter, handleInputFilterClick, inputFilters,
  } = useContext(PlanetContext);

  const setOptions = () => {
    const usedFilters = numericFilter.filterByNumericValues.map(({ column }) => column);
    return COLUMN_OPTIONS.filter((option) => !usedFilters.includes(option));
  };

  const { column, comparison, value } = inputFilters;

  return (
    <form className="numeric-filters-container">
      <label htmlFor="column" className="input-container">
        Coluna
        <select
          name="column"
          id="column"
          value={ column }
          onChange={ handleInputFilter }
          className="input-element"
        >
          { setOptions().map((option) => (
            <option value={ option } key={ option }>{option}</option>
          )) }
        </select>
      </label>
      <label htmlFor="comparison" className="input-container">
        Operador
        <select
          name="comparison"
          id="comparison"
          value={ comparison }
          onChange={ handleInputFilter }
          className="input-element"
        >
          { Object.keys(COMPARISON).map((operator) => (
            <option value={ operator } key={ operator }>{operator}</option>
          )) }
        </select>
      </label>
      <label htmlFor="value" className="input-container">
        Valor
        <input
          type="number"
          name="value"
          id="value"
          value={ value }
          onChange={ handleInputFilter }
          className="input-element"
        />
      </label>
      <button
        type="button"
        onClick={ handleInputFilterClick }
        className="filter-btn"
      >
        Filtrar
      </button>
    </form>
  );
}
