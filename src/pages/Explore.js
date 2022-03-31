import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  return (
    <>
      <Header pageTitle="Explore" />
      <button
        data-testid="explore-foods"
        type="button"
      >
        Explore Foods
      </button>
      <button
        data-testid="explore-drinks"
        type="button"
      >
        Explore Drinks
      </button>
      <Footer />
    </>
  );
}
export default Explore;
