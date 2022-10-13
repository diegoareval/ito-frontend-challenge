import { useState } from "react";
import {MovieItemProps} from '../interfaces/movie.interface.props';

function getStorageValue(key: string) {
  // getting stored value
  const saved = localStorage.getItem(key);
  if(saved){
    return JSON.parse(saved) as MovieItemProps [];
  }
    return []
}

export const useLocalStorage = (key: string) => {
  const [favorites, setValue] = useState<MovieItemProps[]>(() => {
    return getStorageValue(key);
  });

const setFavorite = (key: string, item: MovieItemProps) => {
    const filterItems = favorites.filter(el => el.title === item.title);
    if(filterItems.length > 0) {
      alert("item already exists")
      return; }
    const items = favorites.concat(item)
    localStorage.setItem(key, JSON.stringify(items));
  setValue(items);
}


  return {favorites, setFavorite};
};
