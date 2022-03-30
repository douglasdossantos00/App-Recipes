import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import '../components/cards.css';
import Footer from '../components/Footer';

function Foods({ history }) {
  const { recipesByFilter, meals, categoriesMeals } = useContext(RecipesContext);
  const foods = recipesByFilter.meals || meals.meals || [];
  const categories = categoriesMeals.meals || [];
  return (
    <>
      <Header pageTitle="Foods" history={ history } />
      {categories.map((category, index) => {
        const maxCategories = 5;
        if (index < maxCategories) {
          return (
            <button
              key={ index }
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}

            </button>
          );
        }
        return true;
      })}
      <div className="card-foods">
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
      <Footer />
    </>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Foods;
