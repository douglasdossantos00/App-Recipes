import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchFoodById from '../services/fetchFoodById';
import RecipesContext from '../context/RecipesContext';
import CardRecommendation from '../components/CardRecommendation';

function FoodsIdRecipes(props) {
  const [food, setFood] = useState({});
  const { drinks } = useContext(RecipesContext);

  useEffect(() => {
    const { match: { params: { id } } } = props;
    const getFood = async () => {
      setFood(await fetchFoodById('themealdb', id));
    };
    getFood();
  }, [props]);

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
            src={ food.meals[0].strMealThumb }
            alt="recipe"
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{food.meals[0].strMeal}</h2>
          <button type="button">
            <img
              src={ shareIcon }
              alt="shareIcon"
              data-testid="share-btn"
            />
          </button>
          <button type="button">
            <img
              src={ whiteHeartIcon }
              alt="whiteHeartIcon"
              data-testid="favorite-btn"
            />
          </button>
          <h5 data-testid="recipe-category">{food.meals[0].strCategory}</h5>
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ ingredient }
              >
                {measures[index]}
                {ingredient}
              </li>))}
          </ul>
          <h3>Instructions</h3>
          <p data-testid="instructions">{food.meals[0].strInstructions}</p>
          <iframe
            data-testid="video"
            title="video-food"
            src={ `https://www.youtube.com/embed/${food.meals[0].strYoutube.split('watch?v=')[1]}` }
          />
          {drinks.drinks && drinks.drinks.map((drink, index) => {
            const maxRecipes = 6;
            if (index < maxRecipes) {
              return (
                <CardRecommendation
                  key={ index }
                  index={ index }
                  name={ drink.strDrink }
                  src={ drink.strDrinkThumb }
                  page="drinks"
                  idRecipe={ drink.idDrink }
                  category={ drink.strAlcoholic }
                />);
            }
            return true;
          })}
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
        </div>) }
    </div>
  );
}
FoodsIdRecipes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default FoodsIdRecipes;
