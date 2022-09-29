import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import { TABLE_HEADER } from '../helpers';

export default function Table() {
  const {
    loading, error, appliedFilter,
  } = useContext(PlanetContext);

  if (loading) return <h1 className="placeholder">Loading...</h1>;
  if (error) return <h1 className="placeholder">Error</h1>;
  return (
    <table className="table-container">
      <thead>
        <tr>
          { TABLE_HEADER.map((el) => <th key={ el }>{el}</th>) }
        </tr>
      </thead>
      <tbody>
        {
          appliedFilter
            .map((el, index) => (
              <tr key={ index }>
                <td>{ el.name }</td>
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
