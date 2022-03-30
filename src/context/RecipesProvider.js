import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [recipesByFilter, setRecipesByFilter] = useState({});

  const setRecipes = (recipes) => {
    setRecipesByFilter(recipes);
  };

  return (
    <RecipesContext.Provider value={ { recipesByFilter, setRecipes } }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default RecipesProvider;
