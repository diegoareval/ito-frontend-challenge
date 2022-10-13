import axios from 'axios';

const fetchInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL_AUTH ?? ''}/`,
});

export const fetchInstanceMovieDb = axios.create({
  baseURL: `${import.meta.env.VITE_MOVIEDB_API_URL ?? ''}/`,
});

export default fetchInstance;
