import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import ButtonShare from './ButtonShare';
import './cards.css';

function CardDoneRecipes({ recipe, index, page }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="card-horizontal card
    bg-base-100 mx-2 my-4 shadow-xl z-0"
    >
      <Link to={ `/${page}/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt="card-img"
          data-testid={ `${index}-horizontal-image` }
          className="mt-0 w-28"
        />
      </Link>
      <div className="body-card">
        <ButtonShare
          testID={ `${index}-horizontal-share-btn` }
          page={ page }
          id={ recipe.id }
        />
        <Link to={ `/${page}/${recipe.id}` }>
          <div>
            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.alcoholicOrNot || `${recipe.nationality} - ${recipe.category}`}
            </span>
            <span data-testid={ `${index}-horizontal-name` }>{` - ${recipe.name}`}</span>
          </div>
        </Link>
        <span data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</span>
        {
          recipe.tags.map((elem) => (
            <span
              key={ elem }
              data-testid={ `${index}-${elem}-horizontal-tag` }
            >
              {elem}
            </span>))
        }
      </div>
    </div>

  );
}
CardDoneRecipes.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  page: PropTypes.string.isRequired,

};

export default CardDoneRecipes;
