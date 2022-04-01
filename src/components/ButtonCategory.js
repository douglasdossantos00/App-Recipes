import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import fetchRecipesByCategory from '../services/fetchRecipesByCategories';
import RecipesContext from '../context/RecipesContext';

function ButtonCategory({ page, category, id }) {
  const [isClicked, setIsClicked] = useState('false');
  const { setRecipes } = useContext(RecipesContext);
  const handleClickCategories = async () => {
    if (isClicked === 'false') {
      const recipes = await fetchRecipesByCategory(`https://www.${page}.com/api/json/v1/1/filter.php?c=${category}`);
      setRecipes(recipes);
      setIsClicked('true');
    } else {
      setRecipes({});
      setIsClicked('false');
    }
  };
  return (
    <button
      key={ id }
      type="button"
      data-testid={ `${category}-category-filter` }
      onClick={ () => handleClickCategories() }
    >
      {category}

    </button>
  );
}
ButtonCategory.propTypes = {
  category: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ButtonCategory;
