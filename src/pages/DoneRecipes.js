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
    const recipesFiltred = recipes
      .filter(({ type }) => type === target.name);
    return setFilterRecipes(recipesFiltred);
  };

  useEffect(() => {
    const doneRecipes = JSON
      .parse(localStorage.getItem('doneRecipes'));
    setRecipes(doneRecipes);
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <Header pageTitle="Done Recipes" history={ { push: () => { } } } />
        {/* <Link to="/foods">
          <button type="button">
            <img
              src={ returnIcon }
              alt="btn-return"
              className="btn-return w-8"
            />
          </button>
        </Link> */}
      </div>
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
            recipe={ elem }
            index={ index }
            page={ elem.type === 'food' ? 'foods' : 'drinks' }
          />

        ))
      }

    </>

  );
}
export default DoneRecipes;
