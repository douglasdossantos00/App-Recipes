import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchFoodById from '../services/fetchFoodById';
import RecipesContext from '../context/RecipesContext';
import CardRecommendation from '../components/CardRecommendation';

function DrinksIdRecipes(props) {
  const [drink, setDrink] = useState({});
  const { meals } = useContext(RecipesContext);

  useEffect(() => {
    const { match: { params: { id } } } = props;
    const getDrink = async () => {
      setDrink(await fetchFoodById('thecocktaildb', id));
    };
    getDrink();
  }, [props]);

  const ingredients = drink.drinks && Object.entries(drink.drinks[0])
    .filter((keyAndValue) => keyAndValue[0]
      .includes('strIngredient') && keyAndValue[1])
    .map((ingredient) => ingredient[1]);
  const measures = drink.drinks && Object.entries(drink.drinks[0])
    .filter((keyAndValue) => keyAndValue[0]
      .includes('strMeasure') && keyAndValue[1])
    .map((measure) => measure[1]);
  return (
    <div>
      { drink.drinks && (
        <div>
          <img
            src={ drink.drinks[0].strDrinkThumb }
            alt="recipe"
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{drink.drinks[0].strDrink}</h2>
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
          <h5 data-testid="recipe-category">{drink.drinks[0].strAlcoholic}</h5>
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
          <p data-testid="instructions">{drink.drinks[0].strInstructions}</p>
          {meals.meals && meals.meals.map((meal, index) => {
            const maxRecipes = 6;
            if (index < maxRecipes) {
              return (
                <CardRecommendation
                  key={ index }
                  index={ index }
                  name={ meal.strMeal }
                  src={ meal.strMealThumb }
                  page="foods"
                  idRecipe={ meal.idMeal }
                  category={ meal.strCategory }
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
DrinksIdRecipes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default DrinksIdRecipes;
