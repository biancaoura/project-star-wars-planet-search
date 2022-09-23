import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import PlanetContext from './PlanetContext';
import getPlanetsApi from '../services/planetAPI';
import { INITIAL_INPUT, COMPARISON } from '../helpers';

export default function Provider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  const [appliedFilter, setAppliedFilter] = useState([]);

  const [filterByName, setFilterByName] = useState({ name: '' });
  const [inputFilters, setInputFilters] = useState(INITIAL_INPUT);
  const [numericFilter, setNumericFilter] = useState({ filterByNumericValues: [] });

  useEffect(() => {
    const getPlanets = async () => {
      try {
        const info = await getPlanetsApi();
        info.forEach((el) => delete el.residents);

        setData(info);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e.message);
      }
    };

    getPlanets();
  }, []);

  useEffect(() => {
    setAppliedFilter(data);
  }, [data]);

  useEffect(() => {
    const nameInput = filterByName.name.toLowerCase();
    const teste = data.filter((planet) => planet.name.toLowerCase().includes(nameInput));
    setAppliedFilter(teste);
  }, [filterByName, data]);

  useEffect(() => {
    let updatedPlanets = data;

    numericFilter.filterByNumericValues.forEach(({ column, comparison, value }) => {
      const filterPlanet = updatedPlanets
        .filter((planet) => COMPARISON[comparison](Number(planet[column]),
          Number(value)));
      updatedPlanets = filterPlanet;
    });

    setAppliedFilter(updatedPlanets);
  }, [numericFilter, data]);

  const handleNameChange = ({ target: { value } }) => {
    setFilterByName((prevState) => ({ ...prevState, name: value }));
  };

  const handleNumericFilter = ({ target: { name, value } }) => {
    setInputFilters((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNumericFilterClick = () => {
    const { column, comparison, value } = inputFilters;
    const obj = { column, comparison, value };
    setNumericFilter((prevState) => ({
      ...prevState,
      filterByNumericValues: [...prevState.filterByNumericValues, obj],
    }));

    setInputFilters(INITIAL_INPUT);
  };

  const removeFilterClick = (param) => {
    const filtersArray = numericFilter.filterByNumericValues;
    setNumericFilter((prevState) => ({
      ...prevState,
      filterByNumericValues: filtersArray.filter(({ column }) => column !== param),
    }));
  };

  const removeAllFiltersClick = () => {
    setNumericFilter({ filterByNumericValues: [] });
  };

  const context = {
    loading,
    error,
    data,
    filterByName,
    setFilterByName,
    numericFilter,
    setNumericFilter,
    appliedFilter,
    setAppliedFilter,
    inputFilters,
    setInputFilters,
    handleNameChange,
    handleNumericFilter,
    handleNumericFilterClick,
    removeFilterClick,
    removeAllFiltersClick,
  };

  return (
    <PlanetContext.Provider value={ context }>
      { children }
    </PlanetContext.Provider>
  );
}

Provider.propTypes = {
  children: node.isRequired,
};
