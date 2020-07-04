import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from '../Home/Home.js'
import SingleMovieDetails from '../SingleMovieDetails/SingleMovieDetails.js';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path='/movies/:id'>
            <SingleMovieDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
