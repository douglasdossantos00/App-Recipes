import React, { useState } from 'react';
import propTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import fetchFoodsByFilter from '../services/fetchFoodsByFilter';

function RecipesProvider({ children }) {
  const [foodsByFilter, setFoodsByFilter] = useState([]);

  const getFoods = async (filter, value) => {
    setFoodsByFilter(await fetchFoodsByFilter(filter, value));
  };

  return (
    <RecipesContext.Provider value={ { foodsByFilter, getFoods } }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: propTypes.node.isRequired,
};
export default RecipesProvider;
