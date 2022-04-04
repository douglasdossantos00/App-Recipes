import React, { useEffect, useState } from 'react';
import CardDoneRecipes from '../components/CardDoneRecipes';
import Header from '../components/Header';

function DoneRecipes() {
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

  useEffect(() => {
    const doneRecipes = JSON
      .parse(localStorage.getItem('doneRecipes'));
    setRecipes(doneRecipes);
  }, []);
  console.log(recipes);

  return (
    <>
      <Header pageTitle="Done Recipes" />
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

        filter.map((elem, index) => (
          <CardDoneRecipes
            key={ elem.name }
            index={ index }
            src={ elem.image }
            name={ elem.name }
            tags={ elem.tags }
            date={ elem.doneDate }
            category={ elem.category }
            nationality={ elem.nationality || elem.alcoholicOrNot }
            id={ elem.id }
            page={ elem.type }
          />

        ))
      }

    </>

  );
}
export default DoneRecipes;
