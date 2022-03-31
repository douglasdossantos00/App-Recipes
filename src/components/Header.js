import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './header.css';
import fetchRecipesByFilter from '../services/fetchRecipesByFilter';

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
    <header className="header-container">
      <div className="header-icons">
        <Link to="/profile">
          <button type="button">
            <img
              src={ profileIcon }
              alt="profile"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
        <h1 data-testid="page-title">{ pageTitle }</h1>
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
  <div>

    <input
      data-testid="search-input"
      type="text"
      placeholder="search recipe"
      onChange={ ({ target }) => {
        setValue(target.value);
      } }
    />
    <div className="header-radio">
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="ingredient"
          onClick={ handleRadio }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          type="radio"
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
          onClick={ handleRadio }
        />
        First Letter
      </label>

    </div>
    <div>
      <button
        type="button"
        data-testid="exec-search-btn"
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
