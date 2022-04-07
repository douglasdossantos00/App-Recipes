import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchRandomDrinks from '../services/fetchRandomDrinks';

function ExploreDrinks({ history }) {
  const [drinkId, setDrinkId] = useState('');

  useEffect(() => {
    const getRecipe = async () => {
      const id = await fetchRandomDrinks();
      setDrinkId(id.drinks[0].idDrink);
    };
    getRecipe();
  }, []);

  const handleClick = ({ target: { id } }) => {
    if (id === 'explore-by-ingredient') {
      history.push('./drinks/ingredients');
    }
  };
  return (
    <div className="bg-white div-explore flex font-sans justify-center">
      <Header pageTitle="Explore Drinks" />
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
        <Link to={ `/drinks/${drinkId}` }>
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

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreDrinks;
