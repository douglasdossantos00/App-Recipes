import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <>
      <Header pageTitle="Profile" />
      <div>
        <p data-testid="profile-email">
          Futuro Email
        </p>
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}
export default Profile;
