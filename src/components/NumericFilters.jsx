import React, { useContext, useState, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function NumericFilters() {
  const {
    numericFilter, setNumericFilter,
  } = useContext(PlanetContext);

  const [inputFilters, setInputFilters] = useState(
    { column: 'population', comparison: 'maior que', value: 0 },
  );

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

    setInputFilters({ column: 'population', comparison: 'maior que', value: 0 });
  };

  const toCompare = {
    'maior que': (a, b) => a > b,
    'menor que': (a, b) => a < b,
    'igual a': (a, b) => a === b,
  };

  useEffect(() => {
    const obj = numericFilter.filterByNumericValues[0];
    console.log(obj);
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
          <option value="population" id="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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

      <input
        type="number"
        name="value"
        value={ value }
        onChange={ handleNumericFilter }
        data-testid="value-filter"
      />

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
