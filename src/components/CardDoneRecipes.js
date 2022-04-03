import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './cards.css';
import { Link } from 'react-router-dom';
import ButtonShare from './ButtonShare';

function CardDoneRecipes(
  { index,
    src,
    name,
    tags,
    date,
    category,
    nationality,
    id,
    page,
  },
) {
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
      <span data-testid={ `${index}-horizontal-done-date` }>{date}</span>
      {
        tags.map((elem) => (
          <span
            key={ elem }
            data-testid={ `${index}-${elem}-horizontal-tag` }
          >
            {elem}
          </span>))
      }
    </div>

  );
}
CardDoneRecipes.propTypes = {
  index: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,

};

export default CardDoneRecipes;
