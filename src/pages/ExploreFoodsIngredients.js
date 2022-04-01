import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchIngredientsFoods from '../services/fetchIngredientsFoods';

function ExploreFoodsIngredients() {
  const [ingredients, setIngredients] = useState([]);
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

  return (
    <>
      <Header pageTitle="Explore Ingredients" />
      { ingredients.map((item, index) => (
        <Link to={ `/foods/${item}` } key={ index }>
          <div
            data-testid={ `${index}-ingredient-card` }
            className="cards"
          >
            <img
              src={ `https://www.themealdb.com/images/ingredients/${item}-Small.png` }
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
export default ExploreFoodsIngredients;

// //https://www.themealdb.com/api/json/v1/1/filter.php?i=${item}
