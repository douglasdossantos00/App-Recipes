import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchNationalities from '../services/fetchNationalities';
import fetchRecipesByNationalities from '../services/fetchRecipesByNationalities';

function ExploreFoodsNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const getNationalities = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const fetch = await fetchNationalities(url);
      setNationalities(fetch);
    };
    getNationalities();
  }, []);
  const handleChangeNationalities = async ({ target }) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value} `;
    const fetch = await fetchRecipesByNationalities(url);
    console.log(fetch);
    setRecipes(fetch);
  };
  return (
    <>
      <Header pageTitle="Explore Nationalities" />
      <select
        data-testid="explore-by-nationality-dropdown"
        onClick={ handleChangeNationalities }
      >
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
        {recipes.meals && recipes.meals.map((food, index) => {
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
