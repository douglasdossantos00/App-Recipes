import React from 'react';
import propTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  return (
    <RecipesContext.Provider value={ {} }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: propTypes.node.isRequired,
};
export default RecipesProvider;
