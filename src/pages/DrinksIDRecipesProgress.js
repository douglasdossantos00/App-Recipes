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

function DrinksIdRecipesProgress(props) {
  const [drink, setDrink] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [date, setDate] = useState('');

  const { match: { params: { id } } } = props;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const fullDate = () => {
    const currentDate = new Date();
    const arrayDate = JSON.stringify(currentDate).split('-').join('T').split('T');
    const year = currentDate.getFullYear();
    const dateString = `${arrayDate[2]}/${arrayDate[1]}/${year}`;
    setDate(dateString);
  };

  const ingredientsAndMeasures = (recipe, stringAndFunction) => {
    const result = Object.entries(recipe)
      .filter((keyAndValue) => keyAndValue[0]
        .includes(stringAndFunction[0]) && keyAndValue[1])
      .map((ingredient) => ingredient[1]);
    stringAndFunction[1](result);
  };

  useEffect(() => {
    const getFood = async () => {
      const result = await fetchFoodById(url);
      const recipe = result.drinks[0];
      setDrink(recipe);
      ingredientsAndMeasures(recipe, ['strIngredient', setIngredients]);
      ingredientsAndMeasures(recipe, ['strMeasure', setMeasures]);
    };
    getFood();
    fullDate();
  }, [url]);

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
      { drink && (
        <div className="px-4">
          <img
            className="recipe-photo w-full rounded-xl mt-2"
            src={ drink.strDrinkThumb }
            alt="recipe"
            data-testid="recipe-photo"
          />
          <div className="flex mt-2 justify-between">
            <h2
              data-testid="recipe-title"
              className="font-bold"
            >
              { drink.strDrink }
            </h2>
            <div className="flex w-1/4 justify-evenly items-start">
              <ButtonFavorite
                url={ url }
                id={ id }
                testID="favorite-btn"
                removeFavorite={ () => {} }
                isFavorite={ checkLocalStorage(id) }
              />
              <ButtonShare page="drinks" id={ id } testID="share-btn" />
            </div>
          </div>
          <h5
            data-testid="recipe-category"
            className="mt-2.5"
          >
            { drink.strCategory }
          </h5>
          <h3 className="mt-4">Ingredients</h3>
          <div>
            {ingredients.map((ingredient, index) => {
              const ingredientsLocal = JSON
                .parse(localStorage.getItem('inProgressRecipes'));
              const allIngredients = ingredientsLocal
               && ingredientsLocal.cocktails[id];
              const verify = allIngredients && allIngredients
                .some((number) => number === index);
              return (

                <Checkboxes
                  key={ ingredient }
                  page="cocktails"
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
            { drink.strInstructions }
          </p>
          <ButtonFinishRecipe
            lengthIngredients={ [ingredients.length, 'cocktails', id] }
            handleButtonFinish={ () => saveDoneRecipes(drink, date) }
          />
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
