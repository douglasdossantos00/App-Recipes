import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ButtonCategory from '../components/ButtonCategory';
import Card from '../components/Card';
import '../components/cards.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function Foods({ history }) {
  const { recipesByFilter,
    meals,
    categoriesMeals,
    setRecipes,
    filteredIngredient,
  } = useContext(RecipesContext);

  const foods = recipesByFilter.meals || meals.meals || [];
  const categories = categoriesMeals.meals || [];

  const handleClickAllCategories = () => {
    setRecipes({});
  };
  return (
    <div className="foods bg-white">
      <p>{ filteredIngredient }</p>
      <Header pageTitle="Foods" history={ history } />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClickAllCategories }
      >
        All
      </button>

      {categories.map((category, index) => {
        const maxCategories = 5;
        if (index < maxCategories) {
          return (
            <ButtonCategory
              category={ category.strCategory }
              page="themealdb"
              id={ category.strCategory }
            />
          );
        }
        return true;
      })}
      <div className="card-foods">
        {foods.map((food, index) => {
          const maxRecipes = 12;
          if (index < maxRecipes) {
            return (
              <Card
                key={ index }
                index={ index }
                name={ food.strMeal }
                src={ food.strMealThumb }
                page="foods"
                idRecipe={ food.idMeal }
              />
            );
          }
          return true;
        })}
      </div>
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Foods;
