import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchIngredientsDrinks from '../services/fetchIngredientsDrinks';

function ExploreDrinksIngredients() {
  const [ingredients, setIngredients] = useState([]);
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

  return (
    <>
      <Header pageTitle="Explore Ingredients" />
      {console.log(ingredients)}
      { ingredients.map((item, index) => (
        <Link to="/" key={ index }>
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
