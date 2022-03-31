import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchRandomFoods from '../services/fetchRandomFoods';

function ExploreFoods({ history }) {
  const [mealId, setMealId] = useState('');

  useEffect(() => {
    const getRecipe = async () => {
      const id = await fetchRandomFoods();
      setMealId(id.meals[0].idMeal);
    };
    getRecipe();
  }, []);

  const handleClick = ({ target: { id } }) => {
    if (id === 'explore-by-ingredient') {
      history.push('./foods/ingredients');
    }
    if (id === 'explore-by-nationality') {
      history.push('./foods/nationalities');
    }
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
      <Link to={ `/foods/${mealId}` }>
        <button
          data-testid="explore-surprise"
          id="explore-surprise"
          type="button"
        >
          Surprise me!
        </button>
      </Link>
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
