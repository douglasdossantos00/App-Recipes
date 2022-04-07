import PropTypes from 'prop-types';
import React, { useState } from 'react';
import logo from '../images/logo.png';

function Login({ history }) {
  const [newInputEmail, setInputEmail] = useState('');
  const [newInputPassword, setInputPassword] = useState('');
  const handleChange = ({ target }) => {
    setInputEmail(target.value);
  };

  const handleChangePassword = ({ target }) => {
    setInputPassword(target.value);
  };

  const handleClick = () => {
    const objEmail = { email: newInputEmail };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    // https://stackoverflow.com/questions/38380462/syntaxerror-unexpected-token-o-in-json-at-position-1
    localStorage.setItem('user', JSON.stringify(objEmail));
    setInputEmail('');
    setInputPassword('');
    history.push('/foods');
  };

  const validateButton = () => {
    const regex = /\S+@\S+\.\S+/;
    const validEmail = regex.test(newInputEmail);
    const minPass = 6;
    if (validEmail && newInputPassword.length > minPass) return false;
    return true;
  };

  return (
    <form
      className="
      form-login flex flex-col min-h-screen justify-center items-center"
    >
      <img src={ logo } alt="logo" className="w-56 mb-16" />
      <label
        htmlFor="email"
        className="label-text flex flex-col font-bold text-lg font-serif"
      >
        Email:
        <input
          type="email"
          data-testid="email-input"
          name="email"
          id="email"
          value={ newInputEmail }
          className="input input-bordered text-lg mb-4"
          onChange={ handleChange }
        />
      </label>
      <label
        htmlFor="password"
        className="label-text flex flex-col font-bold text-lg font-serif"
      >
        Senha:
        <input
          type="password"
          data-testid="password-input"
          name="password"
          id="password"
          value={ newInputPassword }
          onChange={ handleChangePassword }
          className="input input-bordered text-lg mb-4"
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ validateButton() }
        onClick={ handleClick }
        className="btn-login btn w-1/2 btn-md font-mono font-bold"
      >
        Enter
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
