import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';


 
class Ratings extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: null
    };
  }
 
  onStarClick(nextValue, prevValue, name) {
    if(this.state.rating === null){
      this.setState({rating: nextValue});
      this.postUserRating(nextValue)
    } else {
      console.log('we made it')
    }
  }

  postUserRating = (rating) => {
    const postObj = {
       "movie_id":this.props.movieId, "rating":rating
    }
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${this.props.currentUser.id}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postObj)
    }
    
    )
  }
 
  render() {
    const { rating } = this.state;
    return (                
      <div>
        <h2>Rating from state: {rating}</h2>
        <StarRatingComponent 
          name="rate1" 
          starCount={10}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}
 
// ReactDOM.render(
//   <SingleMovieDetails />, 
//   document.getElementById('app')
// );

export default Ratings