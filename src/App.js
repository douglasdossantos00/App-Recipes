import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodsNationalities from './pages/ExploreFoodsNationalities';
import DrinksIdRecipes from './pages/DrinksIdRecipes';
import FoodsIdRecipes from './pages/FoodsIdRecipes';
import DrinksIdRecipesProgress from './pages/DrinksIDRecipesProgress';
import FoodsIdRecipesProgress from './pages/FoodsIdRecipesProgress';

function App() {
  return (

    <div>
      <Switch>
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/explore" component={ Explore } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ ExploreFoodsIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExploreFoodsNationalities }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExploreDrinksIngredients }
        />
        <Route exact path="/drinks/:id" component={ DrinksIdRecipes } />
        <Route exact path="/foods/:id" component={ FoodsIdRecipes } />
        <Route path="/drinks/:id/in-progress" component={ DrinksIdRecipesProgress } />
        <Route path="/foods/:id/in-progress" component={ FoodsIdRecipesProgress } />

      </Switch>
    </div>

  );
}

export default App;
