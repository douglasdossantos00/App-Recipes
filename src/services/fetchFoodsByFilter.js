const fetchFoodsByFilter = (page, filterAndValue) => {
  if (filterAndValue[0] === 'ingredient') {
    const url = `https://www.${page}.com/api/json/v1/1/filter.php?i=${filterAndValue[1]}`;
    console.log(url);
    return fetch(url)
      .then((response) => response.json())
      .then((json) => json);
  }
  if ((filterAndValue[0] === 'name')) {
    return fetch(`https://www.${page}.com/api/json/v1/1/search.php?s=${filterAndValue[1]}`)
      .then((response) => response.json())
      .then((json) => json);
  }
  if ((filterAndValue[0] === 'first-letter' && filterAndValue[1].length === 1)) {
    return fetch(`https://www.${page}.com/api/json/v1/1/search.php?f=${filterAndValue[1]}`)
      .then((response) => response.json())
      .then((json) => json);
  }
  if ((filterAndValue[0] === 'first-letter' && filterAndValue[1].length > 1)) {
    return global.alert('Your search must have only 1 (one) character');
  }
};

export default fetchFoodsByFilter;
