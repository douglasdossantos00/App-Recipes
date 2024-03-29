import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
import CardRecommendation from '../components/CardRecommendation';
import '../components/cards.css';
import RecipesContext from '../context/RecipesContext';
import evenlyIcon from '../images/evenlyIcon.svg';
import returnIcon from '../images/returnIcon.png';
import fetchFoodById from '../services/fetchFoodById';
import { checkLocalStorage } from '../services/LocalStorageFavorites';

function FoodsIdRecipes(props) {
  const [food, setFood] = useState({});
  const { drinks } = useContext(RecipesContext);
  const [textButton, setTextButton] = useState('Start Recipe');

  const { match: { params: { id } } } = props;
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  useEffect(() => {
    const getFood = async () => {
      setFood(await fetchFoodById(url));
    };
    getFood();
    const ingredientsLocal = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { meals: {} };
    if (ingredientsLocal.meals[id]) {
      setTextButton('Continue Recipe');
    }
  }, [url, id]);

  const ingredients = food.meals && Object.entries(food.meals[0])
    .filter((keyAndValue) => keyAndValue[0]
      .includes('strIngredient') && keyAndValue[1])
    .map((ingredient) => ingredient[1]);
  const measures = food.meals && Object.entries(food.meals[0])
    .filter((keyAndValue) => keyAndValue[0]
      .includes('strMeasure') && keyAndValue[1])
    .map((measure) => measure[1]);

  return (
    <div className="details-recipe overflow-y-auto bg-white font-sans">
      <header className="header-bar flex justify-between mx-3 items-center">
        <Link to="/foods">
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
      { food.meals && (
        <div className="px-4">
          <img
            className="recipe-photo w-full rounded-xl mt-2"
            src={ food.meals[0].strMealThumb }
            alt="recipe"
            data-testid="recipe-photo"
          />
          <div className="flex mt-2 justify-between">
            <h2
              className="font-bold"
              data-testid="recipe-title"
            >
              { food.meals[0].strMeal }
            </h2>

            <div className="flex w-1/4 justify-evenly items-start">
              <ButtonFavorite
                url={ url }
                id={ id }
                testID="favorite-btn"
                removeFavorite={ () => {} }
                isFavorite={ checkLocalStorage(id) }
              />
              <ButtonShare page="foods" id={ id } testID="share-btn" />
            </div>

          </div>
          <h5
            className="mt-2.5"
            data-testid="recipe-category"
          >
            { food.meals[0].strCategory }
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
            { food.meals[0].strInstructions }
          </p>
          <iframe
            data-testid="video"
            title="video-food"
            className="my-4"
            src={ `https://www.youtube.com/embed/${food.meals[0].strYoutube.split('watch?v=')[1]}` }
          />
          <h3>Recommended</h3>
          <section className="card-recommendation-container">
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
          </section>
          <Link to={ `/foods/${id}/in-progress` }>
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
FoodsIdRecipes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default FoodsIdRecipes;
