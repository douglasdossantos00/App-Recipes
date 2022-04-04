import React from 'react';
import PropTypes from 'prop-types';
import './cards.css';
import { Link } from 'react-router-dom';
import ButtonShare from './ButtonShare';
import ButtonFavorite from './ButtonFavorite';

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
    <div data-testid={ `${index}-recipe-card` } className="cards">
      <Link to={ `/${page}s/${id}` }>
        <img src={ src } alt="card-img" data-testid={ `${index}-horizontal-image` } />
        <span data-testid={ `${index}-horizontal-top-text` }>

          {page === 'food' ? `${nationality} - ${category}` : `${nationality}`}

        </span>
        <span data-testid={ `${index}-horizontal-name` }>{name}</span>
      </Link>
      <ButtonShare
        testID={ `${index}-horizontal-share-btn` }
        page={ `${page}s` }
        id={ id }
      />
      <ButtonFavorite
        id={ id }
        url={ url }
        testID={ `${index}-horizontal-favorite-btn` }
        removeFavorite={ removeFavorite }
      />
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
