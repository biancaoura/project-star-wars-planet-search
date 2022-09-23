import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import { COLUMN_OPTIONS, COMPARISON } from '../helpers';

export default function NumericFilters() {
  const {
    numericFilter, handleNumericFilter, handleNumericFilterClick, inputFilters,
  } = useContext(PlanetContext);

  const setOptions = () => {
    const usedFilters = numericFilter.filterByNumericValues.map((el) => el.column);
    return COLUMN_OPTIONS.filter((option) => !usedFilters.includes(option));
  };

  const { column, comparison, value } = inputFilters;

  return (
    <form>
      <label htmlFor="column">
        Coluna
        <select
          name="column"
          id="column"
          value={ column }
          onChange={ handleNumericFilter }
          data-testid="column-filter"
        >
          { setOptions().map((option) => (
            <option value={ option } key={ option }>{option}</option>
          )) }
        </select>
      </label>
      <label htmlFor="comparison">
        Operador
        <select
          name="comparison"
          id="comparison"
          value={ comparison }
          onChange={ handleNumericFilter }
          data-testid="comparison-filter"
        >
          { Object.keys(COMPARISON).map((el) => (
            <option value={ el } key={ el }>{el}</option>
          )) }
        </select>
      </label>
      <label htmlFor="value">
        Valor
        <input
          type="number"
          name="value"
          id="value"
          value={ value }
          onChange={ handleNumericFilter }
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleNumericFilterClick }
      >
        Filtrar
      </button>
    </form>
  );
}
