import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './cards.css';

function Card({ page, idRecipe, index, src, name }) {
  return (
    <Link to={ `/${page}/${idRecipe}` }>
      <div data-testid={ `${index}-recipe-card` } className="cards">
        <img src={ src } alt="card-img" data-testid={ `${index}-card-img` } />
        <span data-testid={ `${index}-card-name` }>{name}</span>
      </div>
    </Link>
  );
}
Card.propTypes = {
  index: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  idRecipe: PropTypes.string.isRequired,
};

export default Card;
