import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchFoodById from '../services/fetchFoodById';
import '../components/cards.css';
import ButtonFavorite from '../components/ButtonFavorite';
import Checkboxes from '../components/Checkboxes';
import ButtonShare from '../components/ButtonShare';
import ButtonFinishRecipe from '../components/ButtonFinishRecipe';
import saveDoneRecipes from '../services/saveDoneRecipes';

function FoodsIdRecipesProgress(props) {
  const [food, setFood] = useState({});
  const [date, setDate] = useState('');

  const { match: { params: { id } } } = props;
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  const fullDate = () => {
    const currentDate = new Date();
    const arrayDate = JSON.stringify(currentDate).split('-').join('T').split('T');
    const year = currentDate.getFullYear();
    const dateString = `${arrayDate[2]}/${arrayDate[1]}/${year}`;
    setDate(dateString);
  };
  useEffect(() => {
    const getFood = async () => {
      setFood(await fetchFoodById(url));
    };
    getFood();
    fullDate();
  }, [url]);

  const ingredients = food.meals && Object.entries(food.meals[0])
    .filter((keyAndValue) => keyAndValue[0]
      .includes('strIngredient') && keyAndValue[1])
    .map((ingredient) => ingredient[1]);
  const measures = food.meals && Object.entries(food.meals[0])
    .filter((keyAndValue) => keyAndValue[0]
      .includes('strMeasure') && keyAndValue[1])
    .map((measure) => measure[1]);

  return (
    <div>
      { food.meals && (
        <div>
          <img
            className="recipe-photo"
            src={ food.meals[0].strMealThumb }
            alt="recipe"
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{food.meals[0].strMeal}</h2>
          <ButtonShare page="foods" id={ id } testID="share-btn" />
          <ButtonFavorite url={ url } id={ id } />
          <h5 data-testid="recipe-category">{food.meals[0].strCategory}</h5>
          <h3>Ingredients</h3>
          <div>
            {ingredients.map((ingredient, index) => {
              const ingredientsLocal = JSON
                .parse(localStorage.getItem('inProgressRecipes'));
              const allIngredients = ingredientsLocal
               && ingredientsLocal.meals[id];
              const verify = allIngredients && allIngredients
                .some((number) => number === index);
              return (

                <Checkboxes
                  key={ ingredient }
                  page="meals"
                  idRecipe={ id }
                  index={ index }
                  ingredient={ ingredient }
                  measure={ measures[index] }
                  checked={ verify }
                />
              );
            })}
          </div>
          <h3>Instructions</h3>
          <p data-testid="instructions">{food.meals[0].strInstructions}</p>
          <ButtonFinishRecipe
            lengthIngredients={ ingredients.length }
            handleButtonFinish={ () => saveDoneRecipes(food.meals[0], date) }
          />
        </div>) }
    </div>
  );
}
FoodsIdRecipesProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default FoodsIdRecipesProgress;
