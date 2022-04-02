import React from 'react';
import PropTypes from 'prop-types';
import './cards.css';
import shareIcon from '../images/shareIcon.svg';

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
  const [isShare, setIsShare] = useState(false);
  const handleClickShare = () => {
    const url = `http://localhost:3000/${page}/${id}`;
    navigator.clipboard.writeText(url);
    setIsShare(true);
  };
  return (

    <div data-testid={ `${index}-recipe-card` } className="cards">
      <img src={ src } alt="card-img" data-testid={ `${index}-horizontal-image` } />
      <span>{nationality}</span>
      <span data-testid={ `${index}-horizontal-top-text` }>{category}</span>
      <div>
        <button type="button">
          <input
            type="image"
            src={ shareIcon }
            alt="shareIcon"
            data-testid={ `${index}-horizontal-share-btn"` }
            onClick={ handleClickShare }
          />
        </button>
        {isShare && <span>Link copied!</span>}
      </div>
      <span data-testid={ `${index}-horizontal-name` }>{name}</span>
      <span data-testid={ `${index}-horizontal-done-date` }>{date}</span>
      {
        tags.map((elem, indexTag) => (
          <span
            key={ elem }
            data-testid={ `${indexTag}-${elem}-horizontal-tag` }
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
