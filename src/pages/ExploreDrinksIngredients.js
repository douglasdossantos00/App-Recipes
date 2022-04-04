import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchIngredientsDrinks from '../services/fetchIngredientsDrinks';
import fetchDrinksByIngredients from '../services/fetchDrinksByIngredient';

function ExploreDrinksIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setRecipes } = useContext(RecipesContext);
  const num = 12;

  useEffect(() => {
    const getIngredients = async () => {
      const getIngredientList = await fetchIngredientsDrinks();
      const ingredientsObj = getIngredientList.drinks
        .filter((ingredient, index) => [index] < num);
      const arrIngredient = Object.entries(ingredientsObj);
      const ingredientList = arrIngredient.map((item) => (
        item[1].strIngredient1
      ));
      setIngredients(ingredientList);
    };
    getIngredients();
  }, []);

  const sendingIngredient = async (ingredient) => {
    const stringIngredient = ingredient.item;
    const recipesList = await fetchDrinksByIngredients(stringIngredient);
    setRecipes(recipesList);
  };

  return (
    <>
      <Header pageTitle="Explore Ingredients" />
      { ingredients.map((item, index) => (
        <Link
          to="/drinks"
          key={ index }
          onClick={ () => sendingIngredient({ item }) }
        >
          <div
            data-testid={ `${index}-ingredient-card` }
            className="cards"
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${item}-Small.png` }
              alt="card-img"
              data-testid={ `${index}-card-img` }
            />
            <span data-testid={ `${index}-card-name` }>{item}</span>
          </div>
        </Link>
      ))}
      <Footer />
    </>
  );
}

export default ExploreDrinksIngredients;
