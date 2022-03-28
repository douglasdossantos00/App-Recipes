import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';

function App() {
  return (

    <div>
      <Switch>
        <Route path="/profile" component={ Header } />
      </Switch>
    </div>

  );
}

export default App;
