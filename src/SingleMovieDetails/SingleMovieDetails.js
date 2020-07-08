import React from 'react'
import './SingleMovieDetails.css' 
import {withRouter} from 'react-router-dom'
import Ratings from '../Ratings/Ratings'


class SingleMovieDetails extends React.Component {
  constructor() {
    super()
    this.state = {
        id: '',
        title: "",
        poster_path: "",
        backdrop_path: "",
        release_date: "",
        overview: "",
        genres: [],
        budget: 0,
        revenue: 0,
        runtime: '',
        tagline: '',
        average_rating: 0,
        user_rating: null
    }
  }

  updateState = data => {
    // let userRating = this.props.currentUserRatings.find(rating => rating.movie_id === data.movie.id)
    
    this.setState({
        id: data.movie.id,
        title: data.movie.title,
        poster_path: data.movie.poster_path,
        backdrop_path: data.movie.backdrop_path,
        release_date: data.movie.release_date,
        overview: data.movie.overview,
        genres: data.movie.genres,
        budget: data.movie.budget,
        revenue: data.movie.revenue,
        runtime: data.movie.runtime,
        tagline: data.movie.tagline,
        average_rating: Number((data.movie.average_rating).toFixed(1)),
        user_rating: this.props.currentUserRatings.find(rating => rating.movie_id === data.movie.id)
    })
  }

  componentDidMount = () => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(data => this.updateState(data))
    // .then(this.setState({ user_rating: this.props.currentUserRatings.find(rating => rating.movie_id === this.state.id)}))
  }

  render() {
    // let userRating = this.props.currentUserRatings.find(rating => rating.movie_id === this.state.id)

    return (
      <main
        className="single-movie-view"
        style={{ backgroundImage: `url(${this.state.backdrop_path})`}}
      >
        <header className="single-movie-header" data-testid='header'>
          <h1 className='movie-title'>{this.state.title}</h1>
          <h4 className="tagline">{this.state.tagline}</h4>
        </header>
        <section className='poster-section' data-testid='movie-details'>
          <img className="poster" alt={`Movie poster for ${this.state.title}`} src={`${this.state.poster_path}`}/>
          <section className='main-details'>
          
          {this.props.currentUser &&
            (this.state.user_rating ? 
            <p className='current-user-rating'>Your Rating: {this.state.user_rating.rating}</p> : 
            <p className='current-user-rating'>Your Rating: -</p>)
          }

           <div>
             <Ratings 
              currentUser={this.props.currentUser}
              movieId={this.state.id}
             />
           </div>
            <p>Avg Rating: {this.state.average_rating}</p> 
            <p>Synopsis: {this.state.overview}</p>
          </section>
          <section className="misc-details">
            <p>Runtime: {this.state.runtime}</p>
            <p>ReleaseDate: {this.state.release_date}</p>
            <p>Genres: {this.state.genres}</p>
            <p>Budget: {this.state.budget}</p>
            <p>Revenue: {this.state.revenue}</p>
          </section>
        </section>  
      </main>
    )
  }
}

export default withRouter(SingleMovieDetails)