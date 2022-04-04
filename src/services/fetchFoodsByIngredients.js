const fetchFoodsByIngredients = (ingredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const recipesByIngredients = fetch(url)
    .then((response) => response.json());
  return (recipesByIngredients);
};

export default fetchFoodsByIngredients;
