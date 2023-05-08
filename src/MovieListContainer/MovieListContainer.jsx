import React from 'react';
import './MovieListContainer.css';

const MovieListContainer = ({ movies, error }) => {
  const hasMovies = movies.length;

  return (
    <div className="moviesContainer">
      {hasMovies ? (
        movies.map((movie) => {
          return (
            <div className="movie" key={movie.imdbID}>
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
              <img src={movie.Poster} />
            </div>
          );
        })
      ) : error ? (
        <h2>Tenemos un error en el sistema</h2>
      ) : (
        <h2>No results</h2>
      )}
    </div>
  );
};

export default MovieListContainer;
