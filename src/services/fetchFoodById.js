const fetchFoodById = (url) => fetch(url)
  .then((response) => response.json())
  .then((json) => json);

export default fetchFoodById;
