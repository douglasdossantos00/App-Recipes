import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks({ history }) {
  const handleClick = ({ target: { id } }) => {
    if (id === 'explore-by-ingredient') {
      history.push('./drinks/ingredients');
    }
  };
  return (
    <>
      <Header pageTitle="Explore Drinks" />
      <button
        data-testid="explore-by-ingredient"
        id="explore-by-ingredient"
        type="button"
        onClick={ handleClick }
      >
        By Ingredient
      </button>
      <button
        data-testid="explore-surprise"
        id="explore-surprise"
        type="button"
        // onClick={ handleClick }
      >
        Surprise me!
      </button>
      <Footer />
    </>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreDrinks;
