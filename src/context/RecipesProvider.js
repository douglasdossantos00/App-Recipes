import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import fetchRecipes from '../services/fetchRecipes';

function RecipesProvider({ children }) {
  const [recipesByFilter, setRecipesByFilter] = useState({});
  const [meals, setMeals] = useState({});
  const [drinks, setDrinks] = useState({});

  const getRecipes = async () => {
    setMeals(await fetchRecipes('themealdb'));
    setDrinks(await fetchRecipes('thecocktaildb'));
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const setRecipes = (recipes) => {
    setRecipesByFilter(recipes);
  };

  return (
    <RecipesContext.Provider value={ { recipesByFilter, meals, drinks, setRecipes } }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default RecipesProvider;
