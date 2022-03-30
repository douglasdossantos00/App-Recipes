import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipesContext from '../context/RecipesContext';
import '../components/cards.css';
import Footer from '../components/Footer';
import fetchRecipesByCategory from '../services/fetchRecipesByCategories';

function Drinks({ history }) {
  const { recipesByFilter,
    drinks,
    categoriesDrinks,
    setRecipes } = useContext(RecipesContext);

  const [isClicked, setIsClicked] = useState('false');
  const cocktails = recipesByFilter.drinks || drinks.drinks || [];
  const categories = categoriesDrinks.drinks || [];

  const handleClickCategories = async (category) => {
    if (isClicked === 'false') {
      const recipes = await fetchRecipesByCategory('thecocktaildb', category);
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
      <Header pageTitle="Drinks" history={ history } />
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
              onClick={ () => handleClickCategories(category.strCategory) }
            >
              {category.strCategory}

            </button>
          );
        }
        return true;
      })}
      <div className="card-drinks">
        {cocktails.length > 1 && cocktails.map((drink, index) => {
          const maxRecipes = 12;
          if (index < maxRecipes) {
            return (
              <Card
                key={ index }
                index={ index }
                name={ drink.strDrink }
                src={ drink.strDrinkThumb }
              />);
          }
          return true;
        })}
      </div>
      <Footer />
    </>
  );
}
Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Drinks;
