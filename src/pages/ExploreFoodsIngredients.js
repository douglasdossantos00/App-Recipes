import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import fetchFoodsByIngredients from '../services/fetchFoodsByIngredients';
import fetchIngredientsFoods from '../services/fetchIngredientsFoods';

function ExploreFoodsIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setRecipes } = useContext(RecipesContext);
  const num = 12;

  useEffect(() => {
    const getIngredients = async () => {
      const getIngredientList = await fetchIngredientsFoods();
      const ingredientsObj = getIngredientList.meals
        .filter((ingredient, index) => [index] < num);
      const arrIngredient = Object.entries(ingredientsObj);
      const ingredientList = arrIngredient.map((item) => (
        item[1].strIngredient
      ));
      setIngredients(ingredientList);
    };
    getIngredients();
  }, []);

  const sendingIngredient = async (ingredient) => {
    const stringIngredient = ingredient.item;
    const recipesList = await fetchFoodsByIngredients(stringIngredient);
    setRecipes(recipesList);
  };

  return (
    <div className="font-sans bg-white">
      <Header pageTitle="Explore Ingredients" />
      <div
        className="pt-16"
      >
        <div className="card-ingredients flex flex-wrap justify-evenly overflow-y-auto">
          { ingredients.map((item, index) => (
            <Link
              to="/foods"
              key={ index }
              onClick={ () => sendingIngredient({ item }) }
            >
              <div
                data-testid={ `${index}-ingredient-card` }
                className="cards
            card sm:card-side bg-base-100 w-36 my-4 shadow-xl items-center z-0"
              >
                <img
                  src={ `https://www.themealdb.com/images/ingredients/${item}-Small.png` }
                  alt="card-img"
                  data-testid={ `${index}-card-img` }
                />
                <span data-testid={ `${index}-card-name` }>{item}</span>
              </div>
            </Link>
          )) }
        </div>

      </div>
      <Footer />
    </div>
  );
}
export default ExploreFoodsIngredients;
