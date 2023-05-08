import { useCallback, useEffect, useRef, useState } from 'react';
import MovieListContainer from './MovieListContainer/MovieListContainer';
import './App.css';
import useMovies from './Hook/useMovies';
import useSearch from './Hook/useSearch';
import debounce from 'just-debounce-it';

function App() {
  const [sort, setSort] = useState('');
  const { searchText, setSearchText, searchError, setSearchError } =
    useSearch();
  const { movies, loading, error, getMovies } = useMovies({ sort, searchText });

  useEffect(() => {
    getMovies('Peter Pan');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies(searchText);
  };
  const handleChange = (e) => {
    setSearchText(e.target.value);
    const newSearch = e.target.value;
    debouncedMovies(newSearch);
  };
  const debouncedMovies = useCallback(
    debounce((newSearch) => {
      getMovies(newSearch);
    }, 300),
    []
  );

  const handleSelect = (e) => {
    setSort(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} action="">
        <div className="searchContainer">
          <input
            style={{
              border: searchError.status ? 'solid 1px red' : 'solid 1px black',
            }}
            placeholder="Avengers, Matrix, Peter Pan..."
            type="text"
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </div>
        {searchError.status && (
          <span className='errorMessage' style={{ color: 'red' }}>{searchError.message} </span>
        )}
        <div className="selectContainer">
          <label htmlFor="">Order by</label>
          <select onChange={handleSelect}>
            <option value="title">Title</option>
            <option value="year">Year</option>
          </select>
        </div>
      </form>
      <main>
        {loading ? (
          <h2>Loading movies...</h2>
        ) : (
          <MovieListContainer movies={movies} error={error} />
        )}
      </main>
    </>
  );
}

export default App;
