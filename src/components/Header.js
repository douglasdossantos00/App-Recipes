import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import fetchRecipesByFilter from '../services/fetchRecipesByFilter';
import './header.css';

function Header({ pageTitle, history }) {
  const [input, setInput] = useState('false');
  const [filter, setFilter] = useState('');
  const [value, setValue] = useState('');
  const { setRecipes } = useContext(RecipesContext);

  const handleClick = () => {
    if (input === 'true') {
      setInput('false');
    } else {
      setInput('true');
    }
  };

  const handleRadio = ({ target }) => {
    setFilter(target.name);
  };

  return (
    <header className="header-container z-10">
      <div className="header-icons navbar">
        <Link to="/profile">
          <button type="button">
            <img
              src={ profileIcon }
              alt="profile"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
        <h1
          data-testid="page-title"
        >
          { pageTitle }
        </h1>
        {
          (pageTitle === 'Foods' || pageTitle === 'Explore Nationalities'
|| pageTitle === 'Drinks')
&& (
  <button
    type="button"
    onClick={ handleClick }
  >
    <img
      src={ searchIcon }
      alt="profile"
      data-testid="search-top-btn"
    />
  </button>)
        }
      </div>
      <div className="header-input">
        {
          input === 'true'
&& (
  <div className="flex flex-col bg-white justify-evenly">
    <input
      data-testid="search-input"
      type="text"
      placeholder="search recipe"
      className="input input-bordered m-2"
      onChange={ ({ target }) => {
        setValue(target.value);
      } }
    />
    <div className="header-radio flex justify-evenly text-lg">
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="ingredient"
          className="radio radio-primary w-4 h-4 mx-1.5"
          onClick={ handleRadio }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          type="radio"
          className="radio radio-primary w-4 h-4 mx-1.5"
          name="name"
          onClick={ handleRadio }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="first-letter"
          className="radio radio-primary w-4 h-4 mx-1.5"
          onClick={ handleRadio }
        />
        First Letter
      </label>

    </div>
    <div className=" flex justify-center">
      <button
        type="button"
        data-testid="exec-search-btn"
        className="btn btn-sm"
        onClick={ async () => {
          if (filter === 'first-letter' && value.length > 1) {
            global.alert('Your search must have only 1 (one) character');
          } else if (pageTitle === 'Foods') {
            const recipes = await fetchRecipesByFilter('themealdb', [filter, value]);
            setRecipes(recipes);
            if (!recipes.meals) {
              global.alert('Sorry, we haven\'t found any recipes for these filters.');
              return;
            }
            if (recipes.meals.length === 1) {
              history.push(`/foods/${recipes.meals[0].idMeal}`);
            }
          } else {
            const recipes = await fetchRecipesByFilter('thecocktaildb', [filter, value])
              || { drinks: [] };
            if (!recipes.drinks) {
              global.alert('Sorry, we haven\'t found any recipes for these filters.');
              return;
            }
            setRecipes(recipes);

            if (recipes.drinks.length === 1) {
              history.push(`/drinks/${recipes.drinks[0].idDrink}`);
            }
          }
        } }
      >
        Search
      </button>
    </div>
  </div>)
        }
      </div>

    </header>
  );
}
Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Header;
