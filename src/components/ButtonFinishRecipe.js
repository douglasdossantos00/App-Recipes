import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function ButtonFinishRecipe({ lengthIngredients, handleButtonFinish }) {
  const { ingredientsLocalStorage } = useContext(RecipesContext);
  return (
    <Link to="/done-recipes">
      <button
        className="start-recipes-footer"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ lengthIngredients !== ingredientsLocalStorage.length }
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
