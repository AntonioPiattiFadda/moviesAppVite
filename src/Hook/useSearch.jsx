import { useEffect, useState, useRef } from 'react';

const useSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [searchError, setSearchError] = useState({
    status: false,
    message: '',
  });
  const previousSearch = useRef(true);

  useEffect(() => {
    const newQuery = searchText;
    if (previousSearch.current) {
      previousSearch.current = searchText === '';
      return;
    }
    if (previousSearch.current === newQuery) {
      return;
    }
    previousSearch.current = newQuery;
    if (searchText === '') {
      setSearchError({
        ...searchError,
        status: true,
        message: 'Debes ingresar algo para buscar',
      });
      return;
    }
    if (searchText.length <= 3) {
      setSearchError({
        ...searchError,
        status: true,
        message: 'La busqueda tiene que tener como minimo 3 caracteres',
      });
      return;
    }
    setSearchError({ ...searchError, status: false, message: '' });
  }, [searchText]);

  return { searchText, setSearchText, searchError, setSearchError };
};

export default useSearch;
