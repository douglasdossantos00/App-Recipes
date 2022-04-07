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
    <div className="bg-white div-explore flex justify-center font-sans">
      <Header pageTitle="Explore Foods" />
      <div className="pt-20 flex flex-col items-center justify-center">
        <button
          data-testid="explore-by-ingredient"
          id="explore-by-ingredient"
          type="button"
          className=" btn btn-explore my-4"
          onClick={ handleClick }
        >
          By Ingredient
        </button>
        <button
          data-testid="explore-by-nationality"
          id="explore-by-nationality"
          type="button"
          onClick={ handleClick }
          className=" btn btn-explore my-4"
        >
          By Nationality
        </button>
        <Link to={ `/foods/${mealId}` }>
          <button
            data-testid="explore-surprise"
            id="explore-surprise"
            type="button"
            className=" btn btn-explore my-4"
          >
            Surprise me!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreFoods;
