import React, { useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { saveFavorites, deleteFavorite,
  checkLocalStorage } from '../services/LocalStorageFavorites';
import fetchFoodById from '../services/fetchFoodById';

function ButtonFavorite({ url, id, testID, removeFavorite, isFavorite }) {
  const [isClicked, setIsClicked] = useState(isFavorite);

  const handleClickFavorite = async () => {
    const verify = checkLocalStorage(id);
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
  isFavorite: PropTypes.bool.isRequired,

};

export default ButtonFavorite;
