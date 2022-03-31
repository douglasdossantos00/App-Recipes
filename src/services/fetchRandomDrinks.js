const fetchRandomDrinks = () => {
  const randomRecipe = fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((json) => json);
  return (randomRecipe);
};

export default fetchRandomDrinks;
