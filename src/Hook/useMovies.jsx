import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';

const useMovies = ({ sort, searchText }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const APIKEY = import.meta.env.VITE_API_KEY;
  console.log(import.meta.env.VITE_API_KEY);

  const getMovies = useCallback(async (search) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://www.omdbapi.com/?i=tt3896198&apikey=${APIKEY}=${search}`
      );
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  let sortedMovies = useMemo(() => {
    if (sort === 'year') {
      return [...movies].sort((a, b) => a.Year - b.Year);
    } else {
      return [...movies].sort((a, b) => a.Title.localeCompare(b.Title));
    }
  }, [sort, movies]);

  return { movies: sortedMovies, loading, error, getMovies };
};

export default useMovies;
