import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
import CardRecommendation from '../components/CardRecommendation';
import '../components/cards.css';
import evenlyIcon from '../images/evenlyIcon.svg';
import returnIcon from '../images/returnIcon.png';
import RecipesContext from '../context/RecipesContext';
import fetchFoodById from '../services/fetchFoodById';
import { checkLocalStorage } from '../services/LocalStorageFavorites';

function DrinksIdRecipes(props) {
  const [drink, setDrink] = useState({});
  const { meals } = useContext(RecipesContext);
  const [textButton, setTextButton] = useState('Start Recipe');

  const { match: { params: { id } } } = props;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  useEffect(() => {
    const getDrink = async () => {
      setDrink(await fetchFoodById(url));
    };
    getDrink();
    const ingredientsLocal = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { cocktails: {} };
    if (ingredientsLocal.cocktails[id]) {
      setTextButton('Continue Recipe');
    }
  }, [url, id]);

  const ingredients = drink.drinks && Object.entries(drink.drinks[0])
    .filter((keyAndValue) => keyAndValue[0]
      .includes('strIngredient') && keyAndValue[1])
    .map((ingredient) => ingredient[1]);
  const measures = drink.drinks && Object.entries(drink.drinks[0])
    .filter((keyAndValue) => keyAndValue[0]
      .includes('strMeasure') && keyAndValue[1])
    .map((measure) => measure[1]);

  return (
    <div className="details-recipe overflow-y-auto bg-white font-sans">
      <header className="header-bar flex justify-between mx-3 items-center">
        <Link to="/drinks">
          <button type="button">
            <img
              src={ returnIcon }
              alt="btn-return"
              className="btn-return w-8"
            />
          </button>
        </Link>
        <img
          src={ evenlyIcon }
          alt="logo"
          className="w-12"
        />
      </header>
      { drink.drinks && (
        <div className="px-4">
          <img
            className="recipe-photo w-full rounded-xl mt-2"
            src={ drink.drinks[0].strDrinkThumb }
            alt="recipe"
            data-testid="recipe-photo"
          />
          <div className="flex mt-2 justify-between">
            <h2 data-testid="recipe-title">{drink.drinks[0].strDrink}</h2>

            <div className="flex w-1/4 justify-evenly items-start">
              <ButtonShare page="drinks" id={ id } testID="share-btn" />
              <ButtonFavorite
                url={ url }
                id={ id }
                testID="favorite-btn"
                removeFavorite={ () => {} }
                isFavorite={ checkLocalStorage(id) }
              />
            </div>
          </div>
          <h5
            data-testid="recipe-category"
            className="mt-2.5"
          >
            { drink.drinks[0].strAlcoholic }
          </h5>
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
          <p
            data-testid="instructions"
            className="text-justify instructions"
          >
            { drink.drinks[0].strInstructions }
          </p>
          <h3>Recommended</h3>
          <section className="card-recommendation-container">
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
          </section>
          <Link to={ `/drinks/${id}/in-progress` }>
            <button
              className="start-recipes-footer rounded"
              type="button"
              data-testid="start-recipe-btn"
            >
              {textButton}
            </button>
          </Link>
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
