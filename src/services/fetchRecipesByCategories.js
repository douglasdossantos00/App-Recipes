const fetchRecipesByCategory = (url) => fetch(url)
  .then((response) => response.json())
  .then((json) => json);
export default fetchRecipesByCategory;
