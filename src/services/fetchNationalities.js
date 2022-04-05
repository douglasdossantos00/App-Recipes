const fetchNationalities = (url) => {
  console.log(url);
  return fetch(url)
    .then((response) => response.json())
    .then((json) => json);
};
export default fetchNationalities;
