import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Drinks({ history }) {
  return (
    <Header pageTitle="Drinks" history={ history } />
  );
}
Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Drinks;
