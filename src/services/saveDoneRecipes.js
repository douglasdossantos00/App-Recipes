import saveInProgress from './saveInProgressRecipes';

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
  const page = object.type === 'food' ? 'meals' : 'cocktails';
  saveInProgress([], [object.id, page]);
  const dones = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const NameRecipe = Object.values(object)[0];
  const verify = dones.find((favorite) => Object.values(favorite)[0] === NameRecipe);
  if (!verify) {
    localStorage.setItem('doneRecipes', JSON.stringify([...dones, object]));
  }
  return true;
};
export default saveDoneRecipes;
