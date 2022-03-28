import React, { useState } from 'react';
import propTypes from 'prop-types';
import recipesContext from './recipesContext';

function recipesProvider({ children }) {
  const INITIAL_STATE = {
    name: '',
  };
  const [state, setState] = useState(INITIAL_STATE);
  return (
    <recipesContext.Provider value={ state }>
      {children}
    </recipesContext.Provider>
  );
}

recipesProvider.propTypes = {
  children: propTypes.node.isRequired,
};
export default recipesProvider;
