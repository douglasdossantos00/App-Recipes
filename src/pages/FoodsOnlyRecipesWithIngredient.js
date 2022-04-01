import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchFoodsByIngredients from '../services/fetchFoodsByIngredients';

function FoodsOnlyRecipesWithIngredient() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getRecipesFiltred = async () => {
      const recipes = await fetchFoodsByIngredients();
    };
  });

  return (
    <>
      <Header pageTitle={ `Recipes with ${item}` } />
      <Footer />
    </>
  );
}
export default FoodsOnlyRecipesWithIngredient;
