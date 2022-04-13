import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('- A tela tem os data-testids de todos os 12 cards da tela de comidas', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/foods');
});

test('Exibir botoẽs com as 5 primeiras categorias retornadas da API', () => {
  const { history } = renderWithRouter(<App />);
});