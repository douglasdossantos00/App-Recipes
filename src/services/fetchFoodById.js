const fetchFoodById = (page, id) => {
  const url = `https://www.${page}.com/api/json/v1/1/lookup.php?i=${id}`;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => json);
};

export default fetchFoodById;
