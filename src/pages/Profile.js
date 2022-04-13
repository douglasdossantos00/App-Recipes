import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile({ history }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const profileEmail = JSON.parse(localStorage.getItem('user'));
    console.log(profileEmail);
    setEmail(profileEmail);
  }, []);

  const funcLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="bg-white div-explore font-sans flex justify-center">
      <Header pageTitle="Profile" />
      <div className="pt-20 flex flex-col justify-center items-center">
        <p data-testid="profile-email">
          { email.email }
        </p>
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
            className=" btn btn-explore my-4"
          >
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className=" btn btn-explore my-4"
          >
            Favorite Recipes
          </button>
        </Link>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ funcLogout }
          className=" btn btn-explore my-4"
        >
          Logout
        </button>

      </div>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
