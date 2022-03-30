import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';

function Foods({ history }) {
  const { recipesByFilter } = useContext(RecipesContext);
  const foods = recipesByFilter.meals || [];
  return (
    <>
      <Header pageTitle="Foods" history={ history } />
      <div>
        {foods.length > 1 && foods.map((food, index) => {
          const maxRecipes = 12;
          if (index < maxRecipes) {
            return (
              <Card
                key={ index }
                index={ index }
                name={ food.strMeal }
                src={ food.strMealThumb }
              />);
          }
          return true;
        })}
      </div>
    </>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Foods;
