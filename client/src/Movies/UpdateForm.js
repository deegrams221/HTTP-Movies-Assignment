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

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: [],  
};

const UpdateForm = (props) => {
  const [movie, setMovie] = useState(initialMovie);
  
  const {match, movies} = props;

  useEffect(() => {
    const id = match.params.id;

    const movieToUpdate = movies.find(movie => `${movie.id}` === id);
    if (movieToUpdate) {
      console.log(`movieToUpdate`, movieToUpdate);
      setMovie(movieToUpdate);
    }
  }, [match, movies]);

  const changeHandler = e => {
    e.persist();
    setMovie({...movie, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        props.updateMovie(res.data);
        props.history.push(`/movies`);
        setMovie(initialMovie);
      })
      .catch(error => console.log(error.response))
  };

  const handleStar = index => e => {
    setMovie({...movie, stars: movie.star.map((star, starIndex) => {
      return starIndex === index ? e.target.value : star;
    })});
  };

  const addStar = e => {
    e.preventDefault();
    setMovie({...movie, stars: [...movie.stars, '']});
  };

  return (
    <div>
      <h1>Update Movie</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name='title' onChange={changeHandler} placeholder='title' value={movie.title} />
        <input type='text' name='director' onChange={changeHandler} placeholder='director' value={movie.director} />
        <input type='number' name='metascore' onChange={changeHandler} placeholder='metascore' value={movie.metascore} />

        {movie.stars.map((starName, index) => {
          return <input type='text' placeholder='star' value={starName} key={index} OnChange={handleStar(index)} />
        })}
      <button onClick={addStar}>Add Star</button>

      <button type='submit'>Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;