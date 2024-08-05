import React, { createContext, useState } from 'react';

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (resource) => {
    if (favorites.length < 30 && !favorites.some((r) => r.name === resource.name)) {
      setFavorites([...favorites, resource]);
    }
  };

  const removeFromFavorites = (resource) => {
    setFavorites(favorites.filter((r) => r.name !== resource.name));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext, FavoritesProvider };