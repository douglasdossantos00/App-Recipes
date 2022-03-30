import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipesContext from '../context/RecipesContext';
import '../components/cards.css';
import Footer from '../components/Footer';

function Drinks({ history }) {
  const { recipesByFilter, drinks } = useContext(RecipesContext);
  const cocktails = recipesByFilter.drinks || drinks.drinks || [];
  return (
    <>
      <Header pageTitle="Drinks" history={ history } />
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
