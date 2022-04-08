import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonFinishRecipe from '../components/ButtonFinishRecipe';
import ButtonShare from '../components/ButtonShare';
import '../components/cards.css';
import Checkboxes from '../components/Checkboxes';
import evenlyIcon from '../images/evenlyIcon.svg';
import returnIcon from '../images/returnIcon.png';
import fetchFoodById from '../services/fetchFoodById';
import { checkLocalStorage } from '../services/LocalStorageFavorites';
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
          <h3 className="mt-4">Ingredients</h3>
          <div className="flex flex-col">
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
          <h3 className="mt-4">Instructions</h3>
          <p
            data-testid="instructions"
            className="text-justify instructions my-4"
          >
            { food.meals[0].strInstructions }
          </p>
          <ButtonFinishRecipe
            lengthIngredients={ [ingredients.length, 'meals', id] }
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
