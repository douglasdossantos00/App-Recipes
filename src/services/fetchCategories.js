const fetchCategories = (page) => {
  const url = `https://www.${page}.com/api/json/v1/1/list.php?c=list`;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => json);
};

export default fetchCategories;
