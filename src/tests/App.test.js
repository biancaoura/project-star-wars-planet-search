import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mockAPI from './helpers/mockAPI';

describe('Testing NumericFilters component', () => {
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
  })

  it('2 - When applying filters, should only render matching planets', async () => {
    const valueInput = screen.getByRole('spinbutton', { name: /valor/i });
    const filterBtn = screen.getByRole('button', { name: /filtrar/i });

    const planetName = await screen.findAllByRole('cell');
    expect(planetName[0]).toHaveTextContent(/tatooine/i);
  
    userEvent.type(valueInput, '3000000000');    
    userEvent.click(filterBtn);

    expect(valueInput).toHaveValue(0);
    expect(planetName[0]).toHaveTextContent(/naboo/i);
  });

});