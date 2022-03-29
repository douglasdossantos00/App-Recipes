const fetchFoodsByFilter = (filter, value) => {
  if (filter === 'igredient') {
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`)
      .then((response) => response.json())
      .then((json) => json);
  }
  if ((filter === 'name')) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
      .then((response) => response.json())
      .then((json) => json);
  }
  if ((filter === 'first-letter' && value.length === 1)) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`)
      .then((response) => response.json())
      .then((json) => json);
  }
  if ((filter === 'first-letter' && value.length > 1)) {
    return global.alert('Your search must have only 1 (one) character');
  }
};

export default fetchFoodsByFilter;
