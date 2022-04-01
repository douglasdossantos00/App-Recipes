import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchFoodById from '../services/fetchFoodById';
import '../components/cards.css';
import ButtonFavorite from '../components/ButtonFavorite';

function FoodsIdRecipesInProgress(props) {
  const [food, setFood] = useState({});
  const [isShare, setIsShare] = useState(false);

  const { match: { params: { id } } } = props;
  useEffect(() => {
    const getFood = async () => {
      setFood(await fetchFoodById(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`));
    };
    getFood();
  }, [id]);

  const ingredients = food.meals && Object.entries(food.meals[0])
    .filter((keyAndValue) => keyAndValue[0]
      .includes('strIngredient') && keyAndValue[1])
    .map((ingredient) => ingredient[1]);
  const measures = food.meals && Object.entries(food.meals[0])
    .filter((keyAndValue) => keyAndValue[0]
      .includes('strMeasure') && keyAndValue[1])
    .map((measure) => measure[1]);

  const handleClickShare = () => {
    const url = `http://localhost:3000/foods/${id}`;
    navigator.clipboard.writeText(url);
    setIsShare(true);
  };

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
          <ButtonFavorite id={ id } page="themealdb" />
          <h5 data-testid="recipe-category">{food.meals[0].strCategory}</h5>
          <h3>Ingredients</h3>
          <div>
            {ingredients.map((ingredient, index) => (
              <label key={ ingredient } htmlFor="ingredient">

                <input
                  name="ingredient"
                  data-testid={ `${index}-ingredient-step` }
                  type="checkbox"
                />
                {measures[index]}
                {ingredient}
              </label>))}
          </div>
          <h3>Instructions</h3>
          <p data-testid="instructions">{food.meals[0].strInstructions}</p>
          <Link to={ `/foods/${id}/in-progress` }>
            <button
              className="start-recipes-footer"
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finish Recipe
            </button>
          </Link>
        </div>) }
    </div>
  );
}
FoodsIdRecipesInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default FoodsIdRecipesInProgress;
