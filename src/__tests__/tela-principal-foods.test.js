import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('Implemente o filtro das receitas através da API ao clicar no filtro de categoria.', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/foods');

  history.push('/pokemons/4');

  const img = screen.getByRole('img', { name: 'Charmander sprite' });

  expect(screen.getByText('Charmander')).toBeInTheDocument();
  expect(screen.getByText('Fire')).toBeInTheDocument();
  expect(screen.getByText('Average weight: 8.5 kg')).toBeInTheDocument();
  expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  expect(img).toBeInTheDocument();
});

test('Se o card do Pokémon contém um link de navegação para exibir detalhes', () => {
  const { history } = renderWithRouter(<App />);

  const moreDetails = screen.getByRole('link', { name: 'More details' });

  userEvent.click(moreDetails);
  expect(history.location.pathname).toBe('/pokemons/25');
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/pokemons/25');

  const checkbox = screen.getByLabelText('Pokémon favoritado?');

  userEvent.click(checkbox);
  const star = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
  expect(star.src).toBe('http://localhost/star-icon.svg');
});
