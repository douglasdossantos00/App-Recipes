const fetchIngredientsDrinks = () => {
  const drinksIngredients = fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json())
    .then((json) => json);
  return (drinksIngredients);
};

export default fetchIngredientsDrinks;
