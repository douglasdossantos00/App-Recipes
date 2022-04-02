import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import fetchFoodById from '../services/fetchFoodById';
import '../components/cards.css';
import ButtonFavorite from '../components/ButtonFavorite';
import Checkboxes from '../components/Checkboxes';
import RecipesContext from '../context/RecipesContext';

function FoodsIdRecipesProgress(props) {
  const [food, setFood] = useState({});
  const [isShare, setIsShare] = useState(false);
  const { ingredientsLocalStorage } = useContext(RecipesContext);

  const { match: { params: { id } } } = props;
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    const getFood = async () => {
      setFood(await fetchFoodById(url));
    };
    getFood();
  }, [url]);

  const ingredients = food.meals && Object.entries(food.meals[0])
    .filter((keyAndValue) => keyAndValue[0]
      .includes('strIngredient') && keyAndValue[1])
    .map((ingredient) => ingredient[1]);
  const measures = food.meals && Object.entries(food.meals[0])
    .filter((keyAndValue) => keyAndValue[0]
      .includes('strMeasure') && keyAndValue[1])
    .map((measure) => measure[1]);

  const handleClickShare = () => {
    const Url = `http://localhost:3000/foods/${id}`;
    navigator.clipboard.writeText(Url);
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
                  checked={ verify && 'true' }
                />
              );
            })}
          </div>
          <h3>Instructions</h3>
          <p data-testid="instructions">{food.meals[0].strInstructions}</p>
          <Link to="/done-recipes">
            <button
              className="start-recipes-footer"
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ ingredients.length !== ingredientsLocalStorage.length }
            >
              Finish Recipe
            </button>
          </Link>
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
