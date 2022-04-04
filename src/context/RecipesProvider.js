import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import fetchRecipes from '../services/fetchRecipes';
import fetchCategories from '../services/fetchCategories';

function RecipesProvider({ children }) {
  const [recipesByFilter, setRecipesByFilter] = useState({});
  const [meals, setMeals] = useState({});
  const [drinks, setDrinks] = useState({});
  const [categoriesDrinks, setCategoriesDrinks] = useState({});
  const [categoriesMeals, setCategoriesMeals] = useState({});
  const [ingredientsLocalStorage,
    setIngredientsLocalStorage] = useState([]);

  const getRecipes = async () => {
    setMeals(await fetchRecipes('themealdb'));
    setDrinks(await fetchRecipes('thecocktaildb'));
  };

  const getCategories = async () => {
    setCategoriesMeals(await fetchCategories('themealdb'));
    setCategoriesDrinks(await fetchCategories('thecocktaildb'));
  };
  useEffect(() => {
    getRecipes();
    getCategories();
  }, []);

  const setRecipes = (recipes) => {
    setRecipesByFilter(recipes);
  };

  return (
    <RecipesContext.Provider
      value={ { recipesByFilter,
        meals,
        drinks,
        categoriesDrinks,
        categoriesMeals,
        setRecipes,
        ingredientsLocalStorage,
        setIngredientsLocalStorage } }
    >
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default RecipesProvider;
