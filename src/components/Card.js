import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './cards.css';

function Card({ page, idRecipe, index, src, name }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="cards
      card sm:card-side bg-base-100 w-36 mx-2 my-4 h-60 shadow-xl items-center z-0"
    >
      <Link to={ `/${page}/${idRecipe}` }>
        <figure className="m-0">
          <img
            src={ src }
            alt="card-img"
            data-testid={ `${index}-card-img` }
            className="mt-0"
          />
        </figure>
      </Link>
      <div className="card-body justify-center">
        <span
          data-testid={ `${index}-card-name` }
          className="m-0"
        >
          { name }
        </span>
      </div>
    </div>
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
