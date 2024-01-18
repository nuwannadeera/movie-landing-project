import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieList from './Component/MovieList/MovieList';


const API_URL = "http://www.omdbapi.com?apikey=9c0b6a65";

function App() {

  const [movies, setMovies] = useState([]);
  const [myMovie, setsearchMovie] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    setMovies(data.Search);
  }

  // useEffect(() => {
  //   searchMovies(myMovie);
  // }, [])

  const changeOnMovie = (e) => {
    setsearchMovie(e.target.value);
  }

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className='search'>
        <input placeholder='Search For Movies' value={myMovie}
          onChange={changeOnMovie} />
        <img src={SearchIcon} alt='search' onClick={() => searchMovies(myMovie)} />
      </div>
      {movies?.length > 0 ? (
        <div className='container'>
          {
            movies.map((movie) => (
              <MovieList movie={movie} key={movie.imdbID} />
            ))
          }
        </div>
      ) : (
        <div>
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
