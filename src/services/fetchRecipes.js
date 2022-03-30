const fetchRecipes = (page) => {
  const url = `https://www.${page}.com/api/json/v1/1/search.php?s=`;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => json);
};

export default fetchRecipes;
