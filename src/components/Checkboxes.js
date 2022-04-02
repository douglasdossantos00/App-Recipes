import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import saveInProgress from '../services/saveInProgressRecipes';
import RecipesContext from '../context/RecipesContext';

function Checkboxes({ index, ingredient, measure, page, idRecipe, checked }) {
  const [isClicked, setIsClicked] = useState(false);
  const { setIngredientsLocalStorage } = useContext(RecipesContext);

  const handleClickIngredient = () => {
    if (isClicked === true) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
    const ingredientsLocal = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { cocktails: {}, meals: {} };
    const allIngredients = ingredientsLocal[page][idRecipe] || [];
    let arrayIngredients = [];
    const verify = allIngredients.some((number) => number === index);
    if (verify) {
      arrayIngredients = allIngredients.filter((item) => item !== index);
    } else {
      arrayIngredients = [...allIngredients, index];
    }
    setIngredientsLocalStorage(arrayIngredients);
    saveInProgress(arrayIngredients, [idRecipe, page]);
  };

  return (
    <label
      key={ ingredient }
      htmlFor={ ingredient }
      data-testid={ `${index}-ingredient-step` }
    >

      <input
        id={ ingredient }
        type="checkbox"
        name="ingredient"
        checked={ checked }
        onChange={ handleClickIngredient }
      />
      {measure}
      {ingredient}
    </label>
  );
}
Checkboxes.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  idRecipe: PropTypes.string.isRequired,
  checked: PropTypes.string.isRequired,

};

export default Checkboxes;
