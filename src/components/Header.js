import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './header.css';

function Header({ pageTitle }) {
  const [input, setInput] = useState('false');
  const [filter, setFilter] = useState('');
  const [value, setValue] = useState('');
  const { getFoods } = useContext(RecipesContext);

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
&& <input
  data-testid="search-input"
  type="text"
  placeholder="search recipe"
  onChange={ ({ target }) => setValue(target.value) }
/>
        }
      </div>
      {
        pageTitle === 'Foods'
&& (
  <>
    {' '}
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
        onClick={ () => getFoods(filter, value) }
      >
        Search
      </button>
    </div>
  </>

)
      }

    </header>
  );
}
Header.propTypes = {
  pageTitle: propTypes.string.isRequired,
};

export default Header;
