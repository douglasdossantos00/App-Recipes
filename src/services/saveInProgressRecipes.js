const saveInProgress = (recipe) => {
  const object = {
    cocktails: {
      [recipe.idDrink]: '',

    },
    meals: {
      [recipe.idMeal]: '',
    },
  };
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const NameRecipe = Object.values(object)[1];
  const verify = favorites.find((favorite) => Object.values(favorite)[1] === NameRecipe);
  if (!verify) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, object]));
  } else {
    const newFavorites = favorites
      .filter((item) => Object.values(item)[1] !== NameRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  }

  return true;
};
export default saveInProgress;
