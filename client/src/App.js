import React, {useState, useEffect} from "react";
import {Route} from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from './Movies/UpdateForm';
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const [movie, setMovie] = useState([]);
  //console.log("APP: movie", movie);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} movie={movie} updateForm={setMovie} addToSavedList={addToSavedList} />;
        }}
      />
      {/* Add a route at the path /update-movie/:id */}
      <Route path="/update-movie/:id" render={props => {
        return (
          <UpdateForm {...props} movie={movie} updatedMovie={setMovie} addToSavedList={addToSavedList} />
        );
      }} />
    </>
  );
};

export default App;
