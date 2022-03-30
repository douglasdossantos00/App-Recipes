import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import '../components/cards.css';
import Footer from '../components/Footer';
import fetchRecipesByCategory from '../services/fetchRecipesByCategories';

function Foods({ history }) {
  const { recipesByFilter,
    meals,
    categoriesMeals,
    setRecipes } = useContext(RecipesContext);

  const [isClicked, setIsClicked] = useState('false');
  const foods = recipesByFilter.meals || meals.meals || [];
  const categories = categoriesMeals.meals || [];

  const handleClickCategories = async (category) => {
    if (isClicked === 'false') {
      const recipes = await fetchRecipesByCategory(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      setRecipes(recipes);
      setIsClicked('true');
    } else {
      setRecipes({});
      setIsClicked('false');
    }
  };

  const handleClickAllCategories = () => {
    setRecipes({});
  };
  return (
    <>
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
            <button
              key={ index }
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => {
                handleClickCategories(category.strCategory);
              } }
            >
              {category.strCategory}

            </button>
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
