import React from 'react'
import PropTypes from 'prop-types'
import './MovieCardContainer.css'
import MovieCard from '../MovieCard/MovieCard'

function MovieCardContainer({ homeState }) {
  const movieCards = homeState.allMovies.map(movie => {
    return <MovieCard 
      id = {movie.id}
      poster = {movie.poster_path}
      title = {movie.title}
      releaseDate = {movie.release_date}
      avgRating = {Number((movie.average_rating).toFixed(1))}
      homeState = {homeState}
    />
  })
  return (
    <section label='card-container' className='movie-card-container'>
      {movieCards}
    </section>
  )
}

export default MovieCardContainer

MovieCardContainer.propTypes = {
  allMovies: PropTypes.array.isRequired
}