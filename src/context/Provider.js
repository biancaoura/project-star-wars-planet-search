import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import PlanetContext from './PlanetContext';
import getPlanetsApi from '../services/planetAPI';

export default function Provider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState({});

  const [filterByName, setFilterByName] = useState({ name: '' });
  const [numericFilter, setNumericFilter] = useState({
    filterByNumericValues: [],
    appliedFilter: [],
  });

  useEffect(() => {
    const getPlanets = async () => {
      try {
        const info = await getPlanetsApi();
        info.forEach((el) => delete el.residents);

        setData(info);
        setNumericFilter((prevState) => ({ ...prevState, appliedFilter: info }));
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e.message);
      }
    };

    getPlanets();
  }, []);

  const context = {
    loading,
    error,
    data,
    filterByName,
    setFilterByName,
    numericFilter,
    setNumericFilter,
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
