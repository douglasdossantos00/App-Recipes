import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
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
      <h1 data-testid="page-title">Foods</h1>
      <button
        type="button"
        // onClick={ handleClick }
      >
        <img
          src={ searchIcon }
          alt="profile"
          data-testid="search-top-btn"
        />
      </button>

    </header>
  );
}

export default Header;
