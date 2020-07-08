import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SingleMovieDetails from '../SingleMovieDetails/SingleMovieDetails.js';
import Home from '../Home/Home.js'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentUser: null,
      error: '',
      currentUserRatings: []
    }
  }

  fetchUserRatings = (data) => {
    let userId = data.user.id
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings`)
      .then(res => res.json())
      .then(data => this.setState({
        currentUserRatings: data.ratings
      }))
      .catch(err => console.error(err.message))
  }
 
  getCurrentUser = (data) => {
    this.setState({ currentUser: data.user})
  }

  logOutUser = () => {
    this.setState({ currentUser: null })
  }

  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              {/* <Layout> */}
              <Home 
                currentUser={this.state.currentUser} 
                currentUserRatings={this.state.currentUserRatings}
                getCurrentUser={this.getCurrentUser}
                logOutUser={this.logOutUser}
                fetchUserRatings={this.fetchUserRatings}
              />
              {/* </Layout> */}
            </Route>
            <Route path='/movies/:id'>
              <SingleMovieDetails 
                currentUser={this.state.currentUser} 
              />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
