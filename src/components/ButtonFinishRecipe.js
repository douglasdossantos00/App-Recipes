import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function ButtonFinishRecipe({ lengthIngredients, handleButtonFinish }) {
  const { ingredientsLocalStorage,
    setIngredientsLocalStorage } = useContext(RecipesContext);
  useEffect(() => {
    const ingredientsLocal = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { cocktails: {}, meals: {} };
    const allIngredients = ingredientsLocal[lengthIngredients[1]][lengthIngredients[2]]
    || [];
    setIngredientsLocalStorage(allIngredients);
  }, [lengthIngredients, setIngredientsLocalStorage]);
  return (
    <Link to="/done-recipes">
      <button
        className="start-recipes-footer"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ lengthIngredients[0] !== ingredientsLocalStorage.length }
        onClick={ handleButtonFinish }
      >
        Finish Recipe
      </button>
    </Link>
  );
}
ButtonFinishRecipe.propTypes = {
  lengthIngredients: PropTypes.number.isRequired,
  handleButtonFinish: PropTypes.func.isRequired,

};

export default ButtonFinishRecipe;
