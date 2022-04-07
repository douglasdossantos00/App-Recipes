import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import saveInProgress from '../services/saveInProgressRecipes';

function Checkboxes({ index, ingredient, measure, page, idRecipe, checked }) {
  const [isClicked, setIsClicked] = useState(checked);
  const { setIngredientsLocalStorage } = useContext(RecipesContext);

  const handleClickIngredient = () => {
    if (!isClicked) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
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
      className={ isClicked && 'line-through' }
    >

      <input
        id={ ingredient }
        type="checkbox"
        name="ingredient"
        checked={ isClicked }
        className="mx-2"
        onChange={ handleClickIngredient }
      />
      {`${measure} 
      ${ingredient}`}
    </label>
  );
}
Checkboxes.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  idRecipe: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,

};

export default Checkboxes;
