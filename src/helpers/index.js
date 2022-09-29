export const COLUMN_OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export const INITIAL_INPUT = {
  column: COLUMN_OPTIONS[0],
  comparison: 'more than',
  value: '',
};

export const INITIAL_SORT = {
  sortBy: COLUMN_OPTIONS[0],
  direction: '',
};

export const COMPARISON = {
  'more than': (a, b) => a > b,
  'less than': (a, b) => a < b,
  'equal to': (a, b) => a === b,
};

export const TABLE_HEADER = [
  'Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Gravity',
  'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL',
];
