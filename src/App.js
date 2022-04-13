import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import DrinksIdRecipes from './pages/DrinksIdRecipes';
import DrinksIdRecipesProgress from './pages/DrinksIDRecipesProgress';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoods from './pages/ExploreFoods';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreFoodsNationalities from './pages/ExploreFoodsNationalities';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Foods from './pages/Foods';
import FoodsIdRecipes from './pages/FoodsIdRecipes';
import FoodsIdRecipesProgress from './pages/FoodsIdRecipesProgress';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (

    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
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
        <Route path="/drinks/:id/in-progress" component={ DrinksIdRecipesProgress } />
        <Route path="/foods/:id/in-progress" component={ FoodsIdRecipesProgress } />
        <Route exact path="/drinks/:id" component={ DrinksIdRecipes } />
        <Route exact path="/foods/:id" component={ FoodsIdRecipes } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </div>

  );
}

export default App;
