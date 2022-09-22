import React, { useContext, useState, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function NumericFilters() {
  const INITIAL_INPUT = { column: 'population', comparison: 'maior que', value: 0 };
  const COLUMN_OPTIONS = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const {
    numericFilter, setNumericFilter,
  } = useContext(PlanetContext);

  const [inputFilters, setInputFilters] = useState(INITIAL_INPUT);

  const handleNumericFilter = ({ target: { name, value } }) => {
    setInputFilters((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNumericFilterClick = () => {
    const { column, comparison, value } = inputFilters;
    const obj = { column, comparison, value };
    setNumericFilter((prevState) => ({
      ...prevState,
      filterByNumericValues: [obj, ...prevState.filterByNumericValues],
    }));

    setInputFilters(INITIAL_INPUT);
  };

  const toCompare = {
    'maior que': (a, b) => a > b,
    'menor que': (a, b) => a < b,
    'igual a': (a, b) => a === b,
  };

  useEffect(() => {
    const obj = numericFilter.filterByNumericValues[0];
    if (obj) {
      const { column, comparison, value } = obj;
      setNumericFilter((prevState) => ({
        ...prevState,
        appliedFilter: prevState.appliedFilter
          .filter((planet) => toCompare[comparison](Number(planet[column]),
            Number(value))),
      }));
    }
  }, [numericFilter.filterByNumericValues]);

  const setOptions = () => {
    const usedFilters = numericFilter.filterByNumericValues.map((el) => el.column);
    return COLUMN_OPTIONS.filter((option) => !usedFilters.includes(option));
  };

  const { column, comparison, value } = inputFilters;

  return (
    <div>
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
            { Object.keys(toCompare).map((el) => (
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

      <button type="button" data-testid="button-remove-filters">
        Remover Filtros

      </button>
    </div>
  );
}
