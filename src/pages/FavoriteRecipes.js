import React, { useEffect, useState } from 'react';
import CardFavoriteRecipes from '../components/CardFavoriteRecipes';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filterRecipes, setFilterRecipes] = useState();

  const filter = filterRecipes || recipes || [];

  const handleClick = ({ target }) => {
    if (target.name === 'all') {
      return setFilterRecipes();
    }
    if (target.name === 'food') {
      const foods = recipes.filter(({ type }) => type === 'food');
      return setFilterRecipes(foods);
    }
    if (target.name === 'drink') {
      const drinks = recipes.filter(({ type }) => type === 'drink');
      return setFilterRecipes(drinks);
    }
  };

  const removeFavorite = () => {
    const favoriteRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes'));
    setRecipes(favoriteRecipes);
  };

  useEffect(() => {
    const favoriteRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes'));
    setRecipes(favoriteRecipes);
    console.log(favoriteRecipes);
  }, []);
  console.log(recipes);

  return (
    <>
      <Header pageTitle="Favorite Recipes" />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ handleClick }
        name="all"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ handleClick }
        name="food"
      >

        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ handleClick }
        name="drink"
      >

        Drinks
      </button>
      {

        filter.map((elem) => (
          <CardFavoriteRecipes
            key={ elem.name }
            src={ elem.image }
            name={ elem.name }
            category={ elem.category }
            nationality={ elem.nationality || elem.alcoholicOrNot }
            id={ elem.id }
            page={ elem.type }
            removeFavorite={ removeFavorite }
            index={ elem.index }
          />

        ))
      }

    </>
  );
}
export default FavoriteRecipes;
