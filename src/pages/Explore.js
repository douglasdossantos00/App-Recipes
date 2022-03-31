import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore({ history }) {
  const handleClickFoods = () => {
    history.push('./explore/foods');
  };

  const handleClickDrinks = () => {
    history.push('./explore/drinks');
  };
  return (
    <>
      <Header pageTitle="Explore" />
      <button
        data-testid="explore-foods"
        type="button"
        onClick={ handleClickFoods }
      >
        Explore Foods
      </button>
      <button
        data-testid="explore-drinks"
        type="button"
        onClick={ handleClickDrinks }
      >
        Explore Drinks
      </button>
      <Footer />
    </>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Explore;
