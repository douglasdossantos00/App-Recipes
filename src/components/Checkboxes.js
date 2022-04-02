import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import saveInProgress from '../services/saveInProgressRecipes';

function Checkboxes({ index, ingredient, measure, page, idRecipe }) {
  const [isClicked, setIsClicked] = useState('false');

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
    if (isClicked === 'true') {
      setIsClicked('false');
    } else {
      setIsClicked('true');
    }
    const ingredientsLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { cocktails: {}, meals: {} };
    const allIngredients = ingredientsLocalStorage[page][idRecipe] || [];
    let arrayIngredients = [];
    const verify = allIngredients.some((number) => number === index);
    if (verify) {
      arrayIngredients = allIngredients.filter((item) => item !== index);
    } else {
      arrayIngredients = [...allIngredients, index];
    }

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
        checked={ isClicked }
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

};

export default Checkboxes;
