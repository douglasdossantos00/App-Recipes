import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('- A tela tem os data-testids de todos os 12 cards da tela de comidas', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/foods');
});

test('Exibir botoẽs com as 5 primeiras categorias retornadas da API', () => {
  const { history } = renderWithRouter(<App />);
});

test('Implemente o filtro das receitas através da API ao clicar no filtro de categoria.', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/foods');

});
