import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipesContext from '../context/RecipesContext';
import '../components/cards.css';
import Footer from '../components/Footer';
import ButtonCategory from '../components/ButtonCategory';

function Drinks({ history }) {
  const [numberPage, setNumberPage] = useState(1);
  const { recipesByFilter,
    drinks,
    categoriesDrinks,
    setRecipes } = useContext(RecipesContext);

  const cocktails = recipesByFilter.drinks || drinks.drinks || [];
  const categories = categoriesDrinks.drinks || [];

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
            <ButtonCategory
              category={ category.strCategory }
              page="thecocktaildb"
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
        {cocktails.length > 1 && cocktails.map((drink, index) => {
          const maxRecipes = 12;
          if (index < maxRecipes * numberPage
            && index >= (maxRecipes * (numberPage - 1))) {
            return (
              <Card
                key={ index }
                index={ index }
                name={ drink.strDrink }
                src={ drink.strDrinkThumb }
                page="drinks"
                idRecipe={ drink.idDrink }
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
