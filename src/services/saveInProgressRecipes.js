const saveInProgress = (ingredients, idAndPage) => {
  const id = idAndPage[0];
  const page = idAndPage[1];

  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { cocktails: {}, meals: {} };

  if (ingredients.length === 0) {
    delete inProgress[page][id];
    return localStorage
      .setItem('inProgressRecipes', JSON.stringify(inProgress));
  }
  if (page === 'cocktails') {
    inProgress.cocktails[id] = ingredients;
  } else {
    inProgress.meals[id] = ingredients;
  }
  localStorage
    .setItem('inProgressRecipes', JSON.stringify(inProgress));

  return true;
};
export default saveInProgress;
