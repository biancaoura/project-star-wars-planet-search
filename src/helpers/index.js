export const COLUMN_OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export const INITIAL_INPUT = {
  column: COLUMN_OPTIONS[0],
  comparison: 'maior que',
  value: 0,
};

export const COMPARISON = {
  'maior que': (a, b) => a > b,
  'menor que': (a, b) => a < b,
  'igual a': (a, b) => a === b,
};
