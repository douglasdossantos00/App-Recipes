import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipesContext from '../context/RecipesContext';

function Drinks({ history }) {
  const { recipesByFilter } = useContext(RecipesContext);
  const drinks = recipesByFilter.drinks || [];
  return (
    <>
      <Header pageTitle="Drinks" history={ history } />
      <div>
        {drinks.length > 1 && drinks.map((drink, index) => {
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
    </>
  );
}
Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Drinks;
