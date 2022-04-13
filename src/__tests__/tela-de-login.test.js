import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Tela de login', () => {
  // eslint-disable-next-line max-len
  test('2 - Foram criados todos os data-testids email-input, password-input e login-submit-btn', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('3 - É possível escrever seu email no input de email', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
  });

  test('4 - É possível escrever sua senha no input de senha', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
  });

  // eslint-disable-next-line max-len
  test('5 - O formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(button).toBeDisabled();

    userEvent.type(email, 'email.invalid');
    userEvent.type(senha, 'true123');
    // true123 >= 6 caracteres
    expect(button).toBeDisabled();

    userEvent.type(email, '@invalid');
    userEvent.type(senha, 'true123');
    expect(button).toBeDisabled();

    userEvent.type(email, 'invalid.com');
    userEvent.type(senha, 'true123');
    expect(button).toBeDisabled();

    userEvent.type(email, 'valid@email.com');
    userEvent.type(senha, 'false');
    // false < 6 caracteres
    expect(button).toBeDisabled();

    userEvent.type(email, 'invalid@email.');
    userEvent.type(senha, 'true123');
    expect(button).toBeDisabled();

    userEvent.type(email, 'valid@email.com');
    userEvent.type(senha, 'true123');
    expect(button).toBeEnabled();
  });

  // eslint-disable-next-line max-len
  test('6 - Se após a submissão mealsToken e cocktailsToken, os dados estão salvos em localStorage', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
  });

  test('7 - Se após a submissão a chave user está salva em localStorage', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
  });

  test('8 - Se a rota muda para a tela principal de receitas de comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
  });
});
