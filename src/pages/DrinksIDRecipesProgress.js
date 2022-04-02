import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import fetchFoodById from '../services/fetchFoodById';
import '../components/cards.css';
import ButtonFavorite from '../components/ButtonFavorite';
import Checkboxes from '../components/Checkboxes';
import RecipesContext from '../context/RecipesContext';

function DrinksIdRecipesProgress(props) {
  const [drink, setDrink] = useState({});
  const [isShare, setIsShare] = useState(false);
  const { ingredientsLocalStorage } = useContext(RecipesContext);
  console.log(ingredientsLocalStorage.length);
  const { match: { params: { id } } } = props;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  useEffect(() => {
    const getFood = async () => {
      setDrink(await fetchFoodById(url));
    };
    getFood();
  }, [url]);

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
          <h5 data-testid="recipe-category">{drink.drinks[0].strCategory}</h5>
          <h3>Ingredients</h3>
          <div>
            {ingredients.map((ingredient, index) => (
              <Checkboxes
                key={ ingredient }
                page="cocktails"
                idRecipe={ id }
                index={ index }
                ingredient={ ingredient }
                measure={ measures[index] }
              />
            ))}
          </div>
          <h3>Instructions</h3>
          <p data-testid="instructions">{drink.drinks[0].strInstructions}</p>
          <Link to={ `/foods/${id}/in-progress` }>
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
DrinksIdRecipesProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default DrinksIdRecipesProgress;
