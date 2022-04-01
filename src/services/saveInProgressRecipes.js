const saveInProgress = (ingredients, idAndPage) => {
  const id = idAndPage[0];
  const page = idAndPage[1];
  const recipe = {
    [id]: ingredients,
  };
  console.log(recipe);
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};

  if (page === 'drinks') {
    inProgress.drinks = { [id]: [...inProgress.drinks[id]], ...inProgress.drinks };
  }
  localStorage
    .setItem('inProgressRecipes', JSON.stringify(inProgress));

  // const cocktails = {
  //   [id]: [ingredient],

  // };

  // const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  // const NameRecipe = Object.values(object)[1];
  // const verify = favorites.find((favorite) => Object.values(favorite)[1] === NameRecipe);
  // if (!verify) {
  //   localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, object]));
  // } else {
  //   const newFavorites = favorites
  //     .filter((item) => Object.values(item)[1] !== NameRecipe);
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  // }
  console.log(idAndPage);
  return true;
};
export default saveInProgress;
