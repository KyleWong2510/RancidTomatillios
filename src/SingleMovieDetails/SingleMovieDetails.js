import React from 'react'
import './SingleMovieDetails.css' 
import {withRouter} from 'react-router-dom'


class SingleMovieDetails extends React.Component {
  constructor(props) {
    super(props)
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
        average_rating: 0
    }
  }

  updateState = data => {
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
        average_rating: data.movie.average_rating
    })
  }

  componentDidMount(props) {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(data => this.updateState(data));
    console.log(this.data, 'this.state in movie details')
  }

  render() {
    return (
      <main
      className="single-movie-view"
       style={{ backgroundImage: `url(${this.state.backdrop_path})`}}>

        <header className="single-movie-header">
          <h1 className='movie-title'>{this.state.title}</h1>
        <h4 className="tagline">{this.state.tagline}</h4>
        </header>
        <section className='poster-section'>
          <img className="poster" src={`${this.state.poster_path}`}/>
          <div className='main-details'>
            <div>Avg Rating: {this.state.average_rating}</div> 
            <div>Synopsis: {this.state.overview}</div>
          </div>
          <div className="misc-details">
            <p>Runtime: {this.state.runtime}</p>
            <p>ReleaseDate: {this.state.release_date}</p>
            <p>Genres: {this.state.genres}</p>
            <p>Budget: {this.state.budget}</p>
            <p>Revenue: {this.state.revenue}</p>
          </div>
        </section>  
      </main>
    )
  }
}

export default withRouter(SingleMovieDetails)