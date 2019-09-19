// Part 1:
// Create a component with a form to update the chosen movie
// The form should make a PUT request to the server when submitted
// When the call comes back successfully, reset your form state and route the user to /movies where they will see the updated movie in the list

// Movie object format:
//          {
//            id: 5,
//            title: 'Tombstone'
//            director: 'George P. Cosmatos',
//            metascore: 89,
//            stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
//           }

import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function UpdateForm(props) {
  const [movie, setMovie] = useState({});
  
  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };
  
  const {match, movies} = props;
  useEffect(() => {
    const id = match.params.id;
    fetchMovie(id);
  }, [match, movies]);
  
    const handleChange = ev => {
      ev.persist();
      setMovie({...movie, [ev.target.name]: ev.target.value});
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
          //console.log(res.data);
          props.setMovies(res.data);
          props.history.push(`/movies/${movie.id}`);
        })
        .catch(error => console.log(error));
    };
  
    return (
      <div className='update-form'>
        <h2>Update Movie</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type='text' name='title' onChange={handleChange} placeholder='title'
              value={movie.title} />
          </label>
          <label>
            Director:
            <input type='text' name='director' onChange={handleChange} placeholder='director' value={movie.director} />
          </label>
          <label>
            Metascore:
            <input type='text' name='metascore' onChange={handleChange} placeholder='metascore' value={movie.metascore} />
          </label>
          
          <button>Update Movie</button>
        </form>
      </div>
    );
};