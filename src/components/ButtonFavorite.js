import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { saveFavorites, deleteFavorite } from '../services/LocalStorageFavorites';
import fetchFoodById from '../services/fetchFoodById';

function ButtonFavorite({ url, id, testID, removeFavorite }) {
  const [isClicked, setIsClicked] = useState(false);
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const checkLocalStorage = () => {
    const verify = favorites
      .find((favorite) => favorite.id === id);
    if (verify) {
      setIsClicked(true);
    }
    return verify;
  };
  useEffect(() => {
    checkLocalStorage();
  }, []);

  const handleClickFavorite = async () => {
    const verify = checkLocalStorage();
    if (!verify) {
      const fetch = await fetchFoodById(url);
      const recipe = fetch[Object.keys(fetch)[0]][0];
      saveFavorites(recipe);
    } else {
      deleteFavorite(id);
    }
    removeFavorite();
    setIsClicked(!isClicked);
  };
  const icon = isClicked ? blackHeartIcon : whiteHeartIcon;
  return (
    <button type="button">
      <input
        type="image"
        alt="button-favorite"
        data-testid={ testID }
        src={ icon }
        onClick={ handleClickFavorite }
      />

    </button>
  );
}
ButtonFavorite.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  testID: PropTypes.string.isRequired,
  removeFavorite: PropTypes.func.isRequired,

};

export default ButtonFavorite;
