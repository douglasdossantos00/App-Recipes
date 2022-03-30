import React from 'react';
import PropTypes from 'prop-types';

function Card({ index, src, name }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
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
