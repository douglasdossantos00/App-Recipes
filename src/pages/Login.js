import React, { useState } from 'react';

function Login() {
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
  };

  const validateButton = () => {
    const regex = /\S+@\S+\.\S+/;
    const validEmail = regex.test(newInputEmail);
    const minPass = 6;
    if (validEmail && newInputPassword.length > minPass) return false;
    return true;
  };

  return (
    <form>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          data-testid="email-input"
          name="email"
          id="email"
          value={ newInputEmail }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          data-testid="password-input"
          name="password"
          id="password"
          value={ newInputPassword }
          onChange={ handleChangePassword }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ validateButton() }
        onClick={ handleClick }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
