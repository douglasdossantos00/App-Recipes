const fetchRecipesByFilter = (page, filterAndValue) => {
  const filter = filterAndValue[0];
  const value = filterAndValue[1];
  let url = '';
  if (filter === 'ingredient') {
    url = `https://www.${page}.com/api/json/v1/1/filter.php?i=${value}`;
  }
  if ((filter === 'name')) {
    url = `https://www.${page}.com/api/json/v1/1/search.php?s=${value}`;
  }
  if ((filter === 'first-letter' && value.length === 1)) {
    url = `https://www.${page}.com/api/json/v1/1/search.php?f=${value}`;
  }
  return fetch(url)
    .then((response) => response.json())
    .then((json) => json);
};

export default fetchRecipesByFilter;
