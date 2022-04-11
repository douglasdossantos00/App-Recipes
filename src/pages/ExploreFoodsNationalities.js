import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import fetchNationalities from '../services/fetchNationalities';
import fetchRecipes from '../services/fetchRecipes';
import fetchRecipesByNationalities from '../services/fetchRecipesByNationalities';

function ExploreFoodsNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const { meals } = useContext(RecipesContext);
  useEffect(() => {
    const getNationalities = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const fetch = await fetchNationalities(url);
      setNationalities(fetch);
    };
    getNationalities();
  }, [meals]);

  const foods = recipes.meals || meals.meals || [];

  const handleChangeNationalities = async ({ target }) => {
    if (target.value === 'all') {
      const fetch = await fetchRecipes('themealdb');
      return setRecipes(fetch);
    }
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`;
    const fetch = await fetchRecipesByNationalities(url);
    setRecipes(fetch);
  };
  return (
    <div className="font-sans bg-white">
      <Header pageTitle="Explore Nationalities" />
      <div className="pt-24 flex flex-col items-center">
        <select
          data-testid="explore-by-nationality-dropdown"
          className="mt-4 select select-primary w-full max-w-xs"
          onClick={ handleChangeNationalities }
        >
          <option
            data-testid="All-option"
            value="all"
          >
            All
          </option>
          {nationalities.meals && nationalities.meals.map((nationalty) => (
            <option
              key={ nationalty.strArea }
              data-testid={ `${nationalty.strArea}-option` }
              value={ nationalty.strArea }
            >
              {nationalty.strArea}
            </option>
          ))}
        </select>
        <div className="card-foods mt-2 flex flex-wrap justify-evenly overflow-y-auto">
          {foods.map((food, index) => {
            const maxRecipes = 12;
            if (index < maxRecipes) {
              return (
                <Card
                  key={ index }
                  index={ index }
                  name={ food.strMeal }
                  src={ food.strMealThumb }
                  page="foods"
                  idRecipe={ food.idMeal }
                />
              );
            }
            return true;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default ExploreFoodsNationalities;
