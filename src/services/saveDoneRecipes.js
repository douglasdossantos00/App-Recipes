const saveDoneRecipes = (recipe, date) => {
  const object = {
    id: recipe.idMeal || recipe.idDrink,
    type: recipe.strMeal ? 'food' : 'drink',
    nationality: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
    doneDate: date,
    tags: [recipe.strTags] || [],
  };
  const dones = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const NameRecipe = Object.values(object)[1];
  const verify = dones.find((favorite) => Object.values(favorite)[1] === NameRecipe);
  if (!verify) {
    localStorage.setItem('doneRecipes', JSON.stringify([...dones, object]));
  } else {
    const newDones = dones
      .filter((item) => Object.values(item)[1] !== NameRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(newDones));
  }

  return true;
};
export default saveDoneRecipes;
