import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import fetchFoodById from '../services/fetchFoodById';
import RecipesContext from '../context/RecipesContext';
import CardRecommendation from '../components/CardRecommendation';
import '../components/cards.css';
import ButtonFavorite from '../components/ButtonFavorite';

function DrinksIdRecipes(props) {
  const [drink, setDrink] = useState({});
  const { meals } = useContext(RecipesContext);
  const [isShare, setIsShare] = useState(false);
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

  const handleClickShare = () => {
    const Url = `http://localhost:3000/drinks/${id}`;
    navigator.clipboard.writeText(Url);
    setIsShare(true);
  };

  return (
    <div>
      { drink.drinks && (
        <div>
          <img
            className="recipe-photo"
            src={ drink.drinks[0].strDrinkThumb }
            alt="recipe"
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{drink.drinks[0].strDrink}</h2>
          <button type="button">
            <input
              type="image"
              src={ shareIcon }
              alt="shareIcon"
              data-testid="share-btn"
              onClick={ handleClickShare }
            />

          </button>
          {isShare && <span>Link copied!</span>}
          <ButtonFavorite url={ url } id={ id } />
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
              className="start-recipes-footer"
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
