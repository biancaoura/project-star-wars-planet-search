const planetApiUrl = 'https://swapi.dev/api/planets';

const getPlanetsApi = async () => {
  const response = await fetch(planetApiUrl);
  const data = await response.json();
  return data.results;
};

export default getPlanetsApi;
