import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import saveFavorites from '../services/saveFavoritesLocal';
import fetchFoodById from '../services/fetchFoodById';

function ButtonFavorite({ url, id }) {
  const [isClicked, setIsClicked] = useState('false');
  const [recipe, setRecipe] = useState({ meals: [{ id: '' }] });
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const checkLocalStorage = () => {
    const verify = favorites
      .find((favorite) => Object.values(favorite)[0] === id);
    if (verify) {
      setIsClicked('true');
    }
  };
  useEffect(() => {
    const getFood = async () => {
      setRecipe(await fetchFoodById(url));
    };
    getFood();
    const verify = favorites
      .find((favorite) => Object.values(favorite)[0] === id);
    if (verify) {
      setIsClicked('true');
    }
    checkLocalStorage();
  }, [url, id]);

  const handleClickFavorite = () => {
    const Recipe = recipe.drinks || recipe.meals;
    saveFavorites(Recipe[0]);
    if (isClicked === 'false') {
      setIsClicked('true');
    } else {
      setIsClicked('false');
    }
  };
  const icon = isClicked === 'true' ? blackHeartIcon : whiteHeartIcon;
  return (
    <button type="button">
      <input
        type="image"
        alt="button-favorite"
        data-testid="favorite-btn"
        src={ icon }
        onClick={ handleClickFavorite }
      />

    </button>
  );
}
ButtonFavorite.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,

};

export default ButtonFavorite;
