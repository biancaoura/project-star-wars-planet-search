import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function Table() {
  const {
    loading, error, appliedFilter,
  } = useContext(PlanetContext);

  const tableHeader = [
    'Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL',
  ];

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;
  if (appliedFilter) {
    return (
      <table>
        <thead>
          <tr>
            { tableHeader.map((el) => <th key={ el }>{el}</th>) }
          </tr>
        </thead>
        <tbody>
          {
            appliedFilter
              .map((el, index) => (
                <tr key={ index }>
                  <td data-testid="planet-name">{ el.name }</td>
                  <td>{ el.rotation_period }</td>
                  <td>{ el.orbital_period }</td>
                  <td>{ el.diameter }</td>
                  <td>{ el.climate }</td>
                  <td>{ el.gravity }</td>
                  <td>{ el.terrain }</td>
                  <td>{ el.surface_water }</td>
                  <td>{ el.population }</td>
                  <td>{ el.films }</td>
                  <td>{ el.created }</td>
                  <td>{ el.edited }</td>
                  <td>{ el.url }</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    );
  }
}
