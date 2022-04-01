const saveFavorites = (recipe) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const NameRecipe = Object.values(recipe)[1];
  const verify = favorites.find((favorite) => Object.values(favorite)[1] === NameRecipe);
  if (!verify) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, recipe]));
  } else {
    const newFavorites = favorites
      .filter((item) => Object.values(item)[1] !== NameRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  }

  return true;
};
export default saveFavorites;
