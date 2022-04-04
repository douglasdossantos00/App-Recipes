import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchFoodById from '../services/fetchFoodById';
import '../components/cards.css';
import ButtonFavorite from '../components/ButtonFavorite';
import Checkboxes from '../components/Checkboxes';
import ButtonFinishRecipe from '../components/ButtonFinishRecipe';
import ButtonShare from '../components/ButtonShare';
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
    <div>
      { drink && (
        <div>
          <img
            className="recipe-photo"
            src={ drink.strDrinkThumb }
            alt="recipe"
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{drink.strDrink}</h2>

          <ButtonShare page="drinks" id={ id } testID="share-btn" />
          <ButtonFavorite
            url={ url }
            id={ id }
            testID="favorite-btn"
            removeFavorite={ () => {} }
          />

          <h5 data-testid="recipe-category">{drink.strCategory}</h5>
          <h3>Ingredients</h3>
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
          <h3>Instructions</h3>
          <p data-testid="instructions">{drink.strInstructions}</p>
          <ButtonFinishRecipe
            lengthIngredients={ ingredients.length }
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
