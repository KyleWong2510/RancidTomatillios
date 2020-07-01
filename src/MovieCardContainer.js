import React from 'react'
import './MovieCardContainer.css'
import MovieCard from './MovieCard'

function MovieCardContainer(props) {
  const movieCards = props.allMovies.map(movie => {
    return <MovieCard 
      id = {movie.id}
      poster = {movie.poster_path}
      title = {movie.title}
      releaseDate = {movie.release_date}
      avgRating = {movie.average_rating}
    />
  })
  return (
    <section className='movie-card-container'>
      {movieCards}
    </section>
  )
}

export default MovieCardContainer