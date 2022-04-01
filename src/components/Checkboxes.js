import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import saveInProgress from '../services/saveInProgressRecipes';

function Checkboxes({ index, ingredient, measure, page, idRecipe }) {
  const [isClicked, setIsClicked] = useState(false);

  const checkLocalStorage = () => {
    const ingredientsLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const allIngredients = ingredientsLocalStorage
    && ingredientsLocalStorage[page][idRecipe];
    if (allIngredients) setIsClicked(allIngredients.some((number) => number === index));
  };
  useEffect(() => {
    checkLocalStorage();
  }, []);

  const handleClickIngredient = () => {
    setIsClicked(!isClicked);
    const checkboxes = document.getElementsByName('ingredient');
    let arrayIngredients = [];
    checkboxes.forEach((checkbox, indexIngredient) => {
      if (checkbox.checked) {
        arrayIngredients = [...arrayIngredients, indexIngredient];
      }
    });
    console.log(arrayIngredients);
    saveInProgress(arrayIngredients, [idRecipe, page]);
  };

  return (
    <label
      data-testid={ `${index}-ingredient-step` }
      key={ ingredient }
      htmlFor="ingredient"
    >

      <input
        name="ingredient"
        type="checkbox"
        checked={ isClicked }
        onClick={ handleClickIngredient }
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

};

export default Checkboxes;
