import React from 'react';
import { Link } from 'react-router-dom';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './footer.css';

function Footer() {
  return (
    <footer className="footer-container" data-testid="footer">
      <Link to="/drinks">
        <button type="button">
          <img
            src={ drinkIcon }
            alt="drinksIcon"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/explore">
        <button type="button">
          <img
            src={ exploreIcon }
            alt="exploreIcon"
            data-testid="explore-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/foods">
        <button type="button">
          <img
            src={ mealIcon }
            alt="mealsIcon"
            data-testid="food-bottom-btn"
          />
        </button>
      </Link>

    </footer>
  );
}
export default Footer;
