import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './header.css';

function Header() {
  const [input, setInput] = useState('false');
  let pageTitle = '';

  const checkLocationToSetTitle = () => {
    if (window.location.pathname === '/foods') {
      pageTitle = 'Foods';
    }
    if (window.location.pathname === '/drinks') {
      pageTitle = 'Drinks';
    }
    if (window.location.pathname === '/profile') {
      pageTitle = 'Profile';
    }
    if (window.location.pathname === '/explore') {
      pageTitle = 'Explore';
    }
    if (window.location.pathname === '/done-recipes') {
      pageTitle = 'Done Recipes';
    }
    if (window.location.pathname === '/favorite-recipes') {
      pageTitle = 'Favorite Recipes';
    }
    if (window.location.pathname === '/explore/foods') {
      pageTitle = 'Explore Foods';
    }
    if (window.location.pathname === '/explore/drinks') {
      pageTitle = 'Explore Drinks';
    }
    if (window.location.pathname === '/explore/foods/ingredients') {
      pageTitle = 'Explore Ingredients';
    }
    if (window.location.pathname === '/explore/drinks/ingredients') {
      pageTitle = 'Explore Ingredients';
    }
    if (window.location.pathname === '/explore/foods/nationalities') {
      pageTitle = 'Explore Nationalities';
    }
  };
  checkLocationToSetTitle();

  const handleClick = () => {
    if (input === 'true') {
      setInput('false');
    } else {
      setInput('true');
    }
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
                />
                Ingredient
              </label>
              <label htmlFor="name">
                <input
                  data-testid="name-search-radio"
                  type="radio"
                  name="name"
                />
                Name
              </label>
              <label htmlFor="first-letter">
                <input
                  data-testid="first-letter-search-radio"
                  type="radio"
                  name="first-letter"
                />
                First Letter
              </label>

            </div>
            <div>
              <button
                type="button"
                data-testid="exec-search-btn"
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

export default Header;
