export const saveFavorites = (recipe) => {
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
  localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, object]));
};

export const deleteFavorite = (id) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavorites = favorites
    .filter((item) => item.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
};
