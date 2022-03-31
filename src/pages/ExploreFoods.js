import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods({ history }) {
  const handleClick = ({ target: { id } }) => {
    if (id === 'explore-by-ingredient') {
      history.push('./foods/ingredients');
    }
    if (id === 'explore-by-nationality') {
      history.push('./foods/nationalities');
    }
    // if (id === 'explore-by-nationality') {
    //   history.push('./explore/foods/nationalities');
    // }
  };
  return (
    <>
      <Header pageTitle="Explore Foods" />
      <button
        data-testid="explore-by-ingredient"
        id="explore-by-ingredient"
        type="button"
        onClick={ handleClick }
      >
        By Ingredient
      </button>
      <button
        data-testid="explore-by-nationality"
        id="explore-by-nationality"
        type="button"
        onClick={ handleClick }
      >
        By Nationality
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

ExploreFoods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreFoods;
