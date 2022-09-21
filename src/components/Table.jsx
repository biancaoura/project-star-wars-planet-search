import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function Table() {
  const {
    loading, error, data, filterByName, setFilterByName, numericFilter, setNumericFilter,
  } = useContext(PlanetContext);

  const tableHeader = [
    'Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL',
  ];

  const handleNameFilter = ({ target: { value } }) => {
    setFilterByName((prevState) => ({ ...prevState, name: value }));
    setNumericFilter((prevState) => ({
      ...prevState,
      appliedFilter: data.filter((planet) => planet.name.toLowerCase().includes(value)),
    }));
  };

  const { name } = filterByName;

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;
  if (data) {
    return (
      <>
        <label htmlFor="name-filter">
          Planet name
          <input
            type="text"
            value={ name }
            id="name-filter"
            onChange={ handleNameFilter }
            data-testid="name-filter"
          />
        </label>

        <ul>
          {
            numericFilter.filterByNumericValues
              .map(({ column, comparison, value }, index) => (
                <li key={ index }>
                  <span>
                    {column}
                    {' '}
                  </span>
                  <span>
                    {comparison}
                    {' '}
                  </span>
                  <span>{value}</span>
                </li>
              ))
          }
        </ul>

        <table>
          <thead>
            <tr>
              { tableHeader.map((el) => <th key={ el }>{el}</th>)}
            </tr>
          </thead>
          <tbody>
            {
              numericFilter.appliedFilter
                .map((el, index) => (
                  <tr key={ index }>
                    <td>{el.name}</td>
                    <td>{el.rotation_period}</td>
                    <td>{el.orbital_period}</td>
                    <td>{el.diameter}</td>
                    <td>{el.climate}</td>
                    <td>{el.gravity}</td>
                    <td>{el.terrain}</td>
                    <td>{el.surface_water}</td>
                    <td>{el.population}</td>
                    <td>{el.films}</td>
                    <td>{el.created}</td>
                    <td>{el.edited}</td>
                    <td>{el.url}</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </>
    );
  }
}
