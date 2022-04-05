import React, { useEffect, useState, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchNationalities from '../services/fetchNationalities';
import fetchRecipesByNationalities from '../services/fetchRecipesByNationalities';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import fetchRecipes from '../services/fetchRecipes';

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
    <>
      <Header pageTitle="Explore Nationalities" />
      <select
        data-testid="explore-by-nationality-dropdown"
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
      <div className="card-foods">
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
      <Footer />
    </>
  );
}
export default ExploreFoodsNationalities;
