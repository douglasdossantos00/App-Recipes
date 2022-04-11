import React from 'react';
import PropTypes from 'prop-types';
import './cards.css';
import { Link } from 'react-router-dom';
import ButtonShare from './ButtonShare';
import ButtonFavorite from './ButtonFavorite';
import { checkLocalStorage } from '../services/LocalStorageFavorites';

function CardFavoriteRecipes(
  { index,
    src,
    name,
    category,
    nationality,
    id,
    page,
    removeFavorite,
  },
) {
  const typeRecipes = page === 'food' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${typeRecipes}.com/api/json/v1/1/lookup.php?i=${id}`;

  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="card-horizontal card
    bg-base-100 mx-2 my-4 shadow-xl z-0"
    >
      <Link to={ `/${page}s/${id}` }>
        <img src={ src } alt="card-img" data-testid={ `${index}-horizontal-image` } />
      </Link>
      <div className="body-card">
        <Link to={ `/${page}s/${id}` }>
          <span data-testid={ `${index}-horizontal-top-text` }>

            {page === 'food' ? `${nationality} - ${category}` : `${nationality}`}

          </span>
          <div>
            <span data-testid={ `${index}-horizontal-name` }>{name}</span>
          </div>
        </Link>
        <div className="buttons flex">

          <ButtonFavorite
            id={ id }
            url={ url }
            testID={ `${index}-horizontal-favorite-btn` }
            removeFavorite={ removeFavorite }
            isFavorite={ checkLocalStorage(id) }
          />
          <ButtonShare
            testID={ `${index}-horizontal-share-btn` }
            page={ `${page}s` }
            id={ id }
          />
        </div>
      </div>
    </div>

  );
}
CardFavoriteRecipes.propTypes = {
  index: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  removeFavorite: PropTypes.func.isRequired,

};

export default CardFavoriteRecipes;
