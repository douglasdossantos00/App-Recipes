// import React, { useState } from 'react';
import React from 'react';

function Login() {
  // const [email, validateEmail] = useState('');

  // const validateLogin = () => {
  //   const regexEmail = /\S+@\S+\.\S+/;
  //   const validateEmail = regex.test();
  //   const minPassword = 6;
  // };

  return (
    <form>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          data-testid="email-input"
          name="email"
          id="email"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          data-testid="password-input"
          name="password"
          id="password"
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
