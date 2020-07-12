import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import SingleMovieDetails from '../SingleMovieDetails/SingleMovieDetails.js';
import Home from '../Home/Home.js'
import ErrorPage from '../ErrorPage/ErrorPage'
import { fetchUserRatingsData } from '../fetchCalls/fetchCalls'
import Login from '../Login/Login'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentUser: null,
      error: '',
      currentUserRatings: []
    }
    console.log(this.state)
  }

  fetchUserRatings = async (data) => {
    let userId = data.user.id
    return await fetchUserRatingsData(userId)
      .then(data => {
        console.log("1) fetchUserRatings BEFORE🔫: ", this.state.currentUserRatings)
        this.setState({currentUserRatings: data.ratings})
        console.log("2) fetchUserRatings AFTER🔥: ", data.ratings)
        return data
      })
      .catch(err => <Redirect to='/error' />)
  }
 
  getCurrentUser = (data) => {
    this.setState({ currentUser: data.user})
  }

  logOutUser = () => {
    this.setState({ currentUser: null })
  }

  render () {
    console.log('RERENDER APP')

    return (
      <Router>
      <Switch>
        <Route exact path="/">
          {(this.state.currentUser !== null) && <Redirect to='/dashboard' />}
          <Home 
            currentUser={this.state.currentUser} 
            currentUserRatings={this.state.currentUserRatings}
            // getCurrentUser={this.getCurrentUser}
            logOutUser={this.logOutUser}
            // fetchUserRatings={this.fetchUserRatings}
          />
        </Route>
        <Route path='/dashboard'>
          <Home 
            currentUser={this.state.currentUser} 
            currentUserRatings={this.state.currentUserRatings}
            // getCurrentUser={this.getCurrentUser}
            logOutUser={this.logOutUser}
            // fetchUserRatings={this.fetchUserRatings}
          />
        </Route>
        <Route path='/login'>
          <Login 
            getCurrentUser={this.getCurrentUser} 
            // toggleLoginDisplay={this.toggleLoginDisplay} 
            fetchUserRatings={this.fetchUserRatings}
            currentUser={this.state.currentUser}
          />
        </Route>
        <Route path='/movies/:id'>
          <SingleMovieDetails 
            currentUser={this.state.currentUser} 
            currentUserRatings={this.state.currentUserRatings}
            fetchUserRatings={this.fetchUserRatings}
          />
        </Route>
        <Route path='/error'>
          <ErrorPage />
        </Route>
      </Switch>
      </Router>
    )
  }
}

export default App;
