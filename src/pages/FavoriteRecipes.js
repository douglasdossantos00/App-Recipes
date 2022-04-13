import React, { useEffect, useState } from 'react';
import CardFavoriteRecipes from '../components/CardFavoriteRecipes';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filterRecipes, setFilterRecipes] = useState();

  const FavFilter = filterRecipes || recipes || [];
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
    const favorites = JSON
      .parse(localStorage.getItem('favoriteRecipes'));
    setRecipes(favorites);
  };

  useEffect(() => {
    const favoriteRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes'));
    setRecipes(favoriteRecipes);
  }, []);

  return (
    <div className="done-recipes bg-white font-sans">
      <Header pageTitle="Favorite Recipes" />
      <div className="pt-20">
        <div>
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ handleClick }
            name="all"
            className="btn"
          >
            All
          </button>
          <button
            data-testid="filter-by-food-btn"
            type="button"
            onClick={ handleClick }
            name="food"
            className="btn"
          >
            Food
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ handleClick }
            name="drink"
            className="btn"
          >
            Drinks
          </button>
        </div>
        <div className="card-done flex mt-2 flex-wrap justify-evenly overflow-y-auto">
          {
            FavFilter.map((elem, index) => (
              <CardFavoriteRecipes
                key={ elem.name }
                src={ elem.image }
                name={ elem.name }
                category={ elem.category }
                nationality={ elem.nationality || elem.alcoholicOrNot }
                id={ elem.id }
                page={ elem.type }
                removeFavorite={ removeFavorite }
                index={ index }
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}
export default FavoriteRecipes;
