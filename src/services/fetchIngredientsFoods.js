const fetchIngredientsFoods = () => {
  const foodsIngredients = fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json())
    .then((json) => json);
  return (foodsIngredients);
};

export default fetchIngredientsFoods;
