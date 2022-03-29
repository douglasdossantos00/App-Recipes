import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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
    <header>
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
      {
        input === 'true'
        && <input
          data-testid="search-input"
          type="text"
          placeholder="search recipe"
        />
      }

    </header>
  );
}

export default Header;
