import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile({ history }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const profileEmail = localStorage.getItem('user');
    setEmail(profileEmail);
  }, []);

  const funcLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header pageTitle="Profile" />
      <div>

        <p data-testid="profile-email">
          { email }
        </p>

        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </Link>

        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ funcLogout }
        >
          Logout
        </button>

      </div>
      <Footer />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
