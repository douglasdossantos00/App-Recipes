import React, { useEffect, useState } from 'react';
import CardDoneRecipes from '../components/CardDoneRecipes';
import Header from '../components/Header';

function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);

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
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
      {
        recipes.map((elem, index) => (
          <CardDoneRecipes
            key={ elem.name }
            index={ index }
            src={ elem.image }
            name={ elem.name }
            tags={ elem.tags }
            date={ elem.doneDate }
            category={ elem.category }
            nationality={ elem.nationality }
            id={ elem.id }
            page={ elem.type }
          />

        ))
      }

    </>

  );
}
export default DoneRecipes;
