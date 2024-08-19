import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './api/axios';


const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('profile/favorites/');
        setFavorites(response.data);
      } catch (error) {
        console.error('Failed to fetch favorites', error);
      }
    };
  
      fetchFavorites();
    }, []);
    
  const addToFavorites = async (resource) => {
    try {
      console.log('Sending data:', {
        result_id: resource._id,
        result_name: resource.name,
        result_description: resource.description,
        result_image: resource.image,
      });
      const response = await axiosInstance.post('profile/favorites/add/', {
        result_id: resource._id,
        result_name: resource.name,
        result_description: resource.description,
        result_image: resource.image,
      });
      setFavorites([...favorites, response.data]);
    } catch (error) {
      console.error('Failed to add to favorites', error);
    }
  };

  const removeFromFavorites = async (resource) => {
    try {
      await axiosInstance.delete(`profile/favorites/delete/${resource._id}/`);
      setFavorites(favorites.filter((r) => r.result_id !== resource._id));
    } catch (error) {
      console.error('Failed to remove from favorites', error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => {
  return useContext(FavoritesContext);
};

export { FavoritesContext, FavoritesProvider, useFavorites };