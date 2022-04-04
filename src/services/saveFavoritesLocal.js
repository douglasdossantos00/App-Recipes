const saveFavorites = (recipe) => {
  const object = {
    id: recipe.idMeal || recipe.idDrink,
    type: recipe.strMeal ? 'food' : 'drink',
    nationality: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
  };
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const NameRecipe = Object.values(object)[0];
  const verify = favorites.find((favorite) => Object.values(favorite)[0] === NameRecipe);
  object.index = favorites[favorites.length - 1].index + 1 || 0;
  if (!verify) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, object]));
  } else {
    const newFavorites = favorites
      .filter((item) => Object.values(item)[0] !== NameRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  }

  return true;
};
export default saveFavorites;
