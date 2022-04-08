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
    <div className="foods bg-white font-sans">
      <Header pageTitle="Done Recipes" history={ { push: () => { } } } />
      <div className="pt-20">
        <div className="">
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
        <div className="flex flex-col justify-evenly overflow-y-auto">
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
        </div>
      </div>
    </div>

  );
}
export default DoneRecipes;
