import React from 'react'
import PropTypes from 'prop-types'
import './MovieCard.css'
import {Link} from 'react-router-dom'

function MovieCard(
  { 
    key,
    id, 
    poster, 
    title, 
    releaseDate, 
    avgRating, 
    currentUser, 
    currentUserRating,
    renderHeart,
    toggleFavorite
  }) {
    return (
      <Link to ={{pathname: `/movies/${id}`, state:{ id: id }}}>
        <section data-testid="movie-card" className='movie-card' key={key}>
          <img 
            className='card-poster' 
            src={poster} 
            alt={`Movie poster for ${title}`}
          />
          <section className='movie-card-info'>
            {title.length > 35 ? <p>{title.slice(0, 32)}...</p> : <p>{title}</p>}
            {currentUser && 
              <img 
                src={renderHeart(id)} 
                onClick={() => toggleFavorite(id)}
              />
            }
            <p className='release-date'>Release Date: {releaseDate}</p>
            <p className='avg-rating'>Average Rating: {avgRating}</p>
            {currentUser &&
              (currentUserRating ? 
              <p className='current-user-rating'>Your Rating: {currentUserRating.rating}</p> : 
              <p className='current-user-rating'>Your Rating: -</p>)
            }
          </section>
        </section>
      </Link>
    )
  }
export default MovieCard

MovieCard.propTypes = {
  id: PropTypes.number.isRequired, 
  poster: PropTypes.string.isRequired, 
  title: PropTypes.string.isRequired, 
  releaseDate: PropTypes.string.isRequired, 
  avgRating: PropTypes.number.isRequired
}