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
    <form>
      <label htmlFor="column">
        Coluna
        <select
          name="column"
          id="column"
          value={ column }
          onChange={ handleInputFilter }
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
          onChange={ handleInputFilter }
          data-testid="comparison-filter"
        >
          { Object.keys(COMPARISON).map((operator) => (
            <option value={ operator } key={ operator }>{operator}</option>
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
          onChange={ handleInputFilter }
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleInputFilterClick }
      >
        Filtrar
      </button>
    </form>
  );
}
