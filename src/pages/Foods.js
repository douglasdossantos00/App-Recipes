import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Foods({ history }) {
  return (
    <Header pageTitle="Foods" history={ history } />
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Foods;
