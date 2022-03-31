import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore({ history }) {
  const handleClick = ({ target: { id } }) => {
    if (id === 'explore-foods') {
      history.push('./explore/foods');
    }
    if (id === 'explore-drinks') {
      history.push('./explore/drinks');
    }
  };
  return (
    <>
      <Header pageTitle="Explore" />
      <button
        data-testid="explore-foods"
        id="explore-foods"
        type="button"
        onClick={ handleClick }
      >
        Explore Foods
      </button>
      <button
        data-testid="explore-drinks"
        id="explore-drinks"
        type="button"
        onClick={ handleClick }
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
