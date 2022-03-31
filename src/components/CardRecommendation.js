import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardRecommendation({ page, index, src, category, name, idRecipe }) {
  return (
    <Link to={ `/${page}/${idRecipe}` }>
      <div data-testid={ `${index}-recomendation-card` }>
        <img src={ src } alt="card-img" />
        <span>{category}</span>
        <h3 data-testid={ `${index}-recomendation-title` }>{name}</h3>
      </div>
    </Link>
  );
}
CardRecommendation.propTypes = {
  index: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  idRecipe: PropTypes.string.isRequired,

};

export default CardRecommendation;
