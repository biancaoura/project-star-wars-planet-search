import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import PlanetContext from './PlanetContext';
import getPlanetsApi from '../services/planetAPI';
import { INITIAL_INPUT, INITIAL_SORT, COMPARISON } from '../helpers';

export default function Provider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  const [appliedFilter, setAppliedFilter] = useState([]);

  const [filterByName, setFilterByName] = useState({ name: '' });
  const [inputFilters, setInputFilters] = useState(INITIAL_INPUT);
  const [numericFilter, setNumericFilter] = useState({ filterByNumericValues: [] });
  const [order, setOrder] = useState(INITIAL_SORT);
  const [sort, setSort] = useState(INITIAL_SORT);

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
    const filteredName = data
      .filter((planet) => planet.name.toLowerCase().includes(nameInput));
    setAppliedFilter(filteredName);
  }, [filterByName, data]);

  useEffect(() => {
    let updatedPlanets = data;

    numericFilter.filterByNumericValues.forEach(({ column, comparison, value }) => {
      const filterPlanet = updatedPlanets
        .filter((planet) => (
          COMPARISON[comparison](Number(planet[column]), Number(value))));

      updatedPlanets = filterPlanet;
    });

    setAppliedFilter(updatedPlanets);
  }, [numericFilter, data]);

  useEffect(() => {
    let updatedOrder = appliedFilter;

    const { direction, sortBy } = order;

    const rmUnknown = updatedOrder.filter((planet) => (
      planet[sortBy] !== 'unknown'
    ));

    const sortedArr = rmUnknown.sort((a, b) => (
      direction === 'ASC'
        ? Number(a[sortBy]) - Number(b[sortBy])
        : Number(b[sortBy]) - Number(a[sortBy])
    ));

    const addUnknown = updatedOrder.filter((planet) => (
      planet[sortBy] === 'unknown'
    ));

    updatedOrder = [...sortedArr, ...addUnknown];

    setAppliedFilter(updatedOrder);
  }, [sort]);

  const handleNameChange = ({ target: { value } }) => {
    setFilterByName((prevState) => ({ ...prevState, name: value }));
  };

  const handleInputFilter = ({ target: { name, value } }) => {
    setInputFilters((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInputFilterClick = () => {
    const { column, comparison, value } = inputFilters;
    const obj = { column, comparison, value };
    setNumericFilter((prevState) => ({
      ...prevState,
      filterByNumericValues: [...prevState.filterByNumericValues, obj],
    }));

    setInputFilters(INITIAL_INPUT);
  };

  const handleSorting = ({ target: { name, value } }) => {
    setOrder((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSortingClick = () => {
    setSort(order);
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
    order,
    setOrder,
    handleNameChange,
    handleInputFilter,
    handleInputFilterClick,
    handleSorting,
    handleSortingClick,
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
