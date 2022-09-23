import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mockAPI from './helpers/mockAPI';

describe('Testing resolved promise', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockAPI),
    }));

    await act(async () => render(<App />));
  });

  it('1 - Should fetch the correct API', async () => {
    const planetName = await screen.findByText(/tatooine/i);
    expect(planetName).toBeInTheDocument();
  });
});

describe('Testing filters', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockAPI),
    }));

    await act(async () => render(<App />));
  });

  afterEach(cleanup);
  
  it('1 - When applying filters, should only render matching planets', async () => {
    
    const valueInput = screen.getByRole('spinbutton', { name: /valor/i });
    const filterBtn = screen.getByRole('button', { name: /filtrar/i });

    const planetName = await screen.findAllByRole('cell');
    expect(planetName[0]).toHaveTextContent(/tatooine/i);
  
    userEvent.type(valueInput, '3000000000');    

    expect(valueInput).toHaveValue(3000000000);

    userEvent.click(filterBtn);

    expect(valueInput).toHaveValue(0);
    expect(planetName[0]).toHaveTextContent(/naboo/i);
  });

  it('2 - Clicking the button to remove an individual filter should render an updated list', async () => {
    const planetName = await screen.findAllByRole('cell');
    expect(planetName[0]).toHaveTextContent(/tatooine/i);

    const columnInput = screen.getByRole('combobox', { name: /coluna/i });
    const comparisonInput = screen.getByRole('combobox', { name: /operador/i });
    const valueInput = screen.getByRole('spinbutton', { name: /valor/i });
    const filterBtn = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.selectOptions(comparisonInput, 'menor que');
    userEvent.type(valueInput, '10000');    
    userEvent.click(filterBtn);

    expect(planetName[0]).toHaveTextContent(/hoth/i);

    const removeBtn = screen.getByRole('button', { name: /x/i });
    
    userEvent.click(removeBtn);
    expect(planetName[0]).toHaveTextContent(/tatooine/i);
    expect(removeBtn).not.toBeInTheDocument();
  });

  it('3 - Clicking the button to remove all filters should render the entire list of planets', async () => {
    const planetName = await screen.findAllByRole('cell');
    expect(planetName[0]).toHaveTextContent(/tatooine/i);

    const columnInput = screen.getByRole('combobox', { name: /coluna/i });
    const comparisonInput = screen.getByRole('combobox', { name: /operador/i });
    const valueInput = screen.getByRole('spinbutton', { name: /valor/i });
    const filterBtn = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.selectOptions(comparisonInput, 'menor que');
    userEvent.type(valueInput, '10000');    
    userEvent.click(filterBtn);

    userEvent.selectOptions(columnInput, 'rotation_period');
    userEvent.selectOptions(comparisonInput, 'igual a');
    userEvent.type(valueInput, '18');    
    userEvent.click(filterBtn);

    expect(planetName[0]).toHaveTextContent(/endor/i);

    const removeAllBtn = screen.getByRole('button', { name: /remover todos/i });

    userEvent.click(removeAllBtn);
    expect(planetName[0]).toHaveTextContent(/tatooine/i);
  });

  it('4 - Should filter only the matching planets when typing a planet name', async () => {
    const bespinPlanet = await screen.findByText(/bespin/i);

    const inputPlanetName = screen.getByRole('textbox', { name: /planet name/i });

    userEvent.type(inputPlanetName, 'c');
    expect(bespinPlanet).not.toBeInTheDocument();
  });
});

describe('Testing sorting the list', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockAPI),
    }));

    await act(async () => render(<App />));
  });

  afterEach(cleanup);

  it('1 - Filtering by population should order the list with unknown population at the bottom', async () => {
    const planetName = await screen.findAllByRole('cell');
    expect(planetName[0]).toHaveTextContent(/tatooine/i);

    const sortOptions = screen.getByRole('combobox', { name: /ordenar por/i });
    const descending = screen.getByRole('radio', { name: /descendente/i });
    const sortBtn = screen.getByRole('button', { name: /ordenar/i });

    userEvent.selectOptions(sortOptions, 'population');
    userEvent.click(descending);
    userEvent.click(sortBtn);

    expect(planetName[0]).toHaveTextContent(/coruscant/i);
    expect(planetName[117]).toHaveTextContent(/dagobah/i);
  });

  it('2 - Filtering by diameter should order the correct list', async () => {
    const planetName = await screen.findAllByRole('cell');
    expect(planetName[0]).toHaveTextContent(/tatooine/i);

    const sortOptions = screen.getByRole('combobox', { name: /ordenar por/i });
    const ascending = screen.getByRole('radio', { name: /ascendente/i });
    const sortBtn = screen.getByRole('button', { name: /ordenar/i });

    userEvent.selectOptions(sortOptions, 'diameter');
    userEvent.click(ascending);
    userEvent.click(sortBtn);

    expect(planetName[0]).toHaveTextContent(/endor/i);
    expect(planetName[117]).toHaveTextContent(/bespin/i);    
  });
});

describe('Testing rejected promise', () => {
  it('1 - Should render an error message', async () => {
    render(<App />)

    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => Promise.reject({
      message: 'Error'
    }));


    const errMsg = await screen.findByRole('heading', { level: 1, name: /error/i });

    expect(errMsg).toBeInTheDocument();
  });
});
