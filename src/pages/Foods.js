import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import '../components/cards.css';
import Footer from '../components/Footer';

import ButtonCategory from '../components/ButtonCategory';

function Foods({ history }) {
  const [numberPage, setNumberPage] = useState(1);
  const { recipesByFilter,
    meals,
    categoriesMeals,
    setRecipes } = useContext(RecipesContext);

  const foods = recipesByFilter.meals || meals.meals || [];
  const categories = categoriesMeals.meals || [];

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
            <ButtonCategory
              category={ category.strCategory }
              page="themealdb"
              id={ category.strCategory }
            />
          );
        }
        return true;
      })}
      <button
        type="button"
        onClick={ () => setNumberPage(numberPage - 1) }
      >
        {'<'}
      </button>
      <button
        type="button"
        onClick={ () => setNumberPage(numberPage + 1) }
      >
        {'>'}
      </button>
      <div className="card-foods">
        {foods.map((food, index) => {
          const maxRecipes = 12;
          if (index < maxRecipes * numberPage
            && index >= (maxRecipes * (numberPage - 1))) {
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
