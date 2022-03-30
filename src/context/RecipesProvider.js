import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [foodsByFilter, setFoodsByFilter] = useState({ meals: [], drinks: [] });

  const getFoods = (recipes) => {
    setFoodsByFilter(recipes);
  };

  return (
    <RecipesContext.Provider value={ { foodsByFilter, getFoods } }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default RecipesProvider;
