import React from 'react';
import PropTypes from 'prop-types';
import './cards.css';

function Card({ index, src, name }) {
  return (
    <div data-testid={ `${index}-recipe-card` } className="cards">
      <img src={ src } alt="card-img" data-testid={ `${index}-card-img` } />
      <span data-testid={ `${index}-card-name` }>{name}</span>
    </div>
  );
}
Card.propTypes = {
  index: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Card;
