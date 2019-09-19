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
  
    useEffect(() => {
      if (props.movies.length > 0) {
        const movieToUpdate = props.movies.find(
          movie => `${movie.id}` === props.match.params.id,
        );
        setMovie(movieToUpdate);
      }
    }, [props.match.params.id, props.movies]);
  
    const handleChange = e =>
      setMovie({ ...movie, [e.target.name]: e.target.value });
  
    const handleSubmit = e => {
      e.preventDefault();
      axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
          console.log(res.data);
          props.setMovies([
            ...props.movies.filter(el => el.id !== movie.id),
            res.data,
          ]);
          // axios
          //   .get('http://localhost:5000/api/movies')
          //   .then(res => props.setMovies(res.data));
          props.history.push(`/movies/${movie.id}`);
        })
        .catch(err => console.log(err));
    };
  
    return (
      <div className='form'>
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
  }