import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ButtonCategory from '../components/ButtonCategory';
import Card from '../components/Card';
import '../components/cards.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function Drinks({ history }) {
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
    <div className="drinks bg-white font-sans">
      <Header pageTitle="Drinks" history={ history } />
      <div className="pt-20">
        <div className="">
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ handleClickAllCategories }
            className="btn"
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
          }) }
        </div>
        <div
          className="card-foods
         flex flex-wrap justify-evenly overflow-y-auto text-xs"
        >
          {cocktails.length > 1 && cocktails.map((drink, index) => {
            const maxRecipes = 12;
            if (index < maxRecipes) {
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
      </div>
      <Footer />
    </div>
  );
}
Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Drinks;
