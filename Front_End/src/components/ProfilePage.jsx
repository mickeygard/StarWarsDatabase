import React, { useEffect, useState } from 'react';
import axiosInstance from './api/axios';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [editing, setEditing] = useState(false);
  const [alignment, setAlignment] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('profile/profile/');
        setProfile(response.data);
        setAlignment(response.data.alignment);
        setBio(response.data.bio);
      } catch (error) {
        console.error('Failed to fetch profile', error, error.response ? error.response.data : error.message);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('profile/favorites/');
        const favoritesData = await Promise.all(response.data.map(async (favorite) => {
          const resultResponse = await axios.get
          (`https://starwars-databank-server.vercel.app/api/v1/${favorite.category}/${favorite.result_id}`);
          return { ...favorite, ...resultResponse.data };
        }));
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Failed to fetch favorites', error.response ? error.response.data : error.message);
      }
    };

    fetchProfile();
    fetchFavorites();
  }, []);

  const handleSave = async () => {
    try {
      await axiosInstance.put('profile/profile/', { alignment, bio });
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile', error, error.response ? error.response.data : error.message);
    }
  };

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await axiosInstance.delete(`profile/favorites/delete/${favoriteId}/`);
      setFavorites(favorites.filter(fav => fav.result_id !== favoriteId));
    } catch (error) {
      console.error('Failed to remove favorite', error, error.response ? error.response.data : error.message);
    }
  };

  if (!profile) {
    return <div>No Profile Info Found</div>;
  }

  return (
    <div>
      <h1>{profile.username?.username}</h1>
      {editing ? (
        <div>
          <label>
            Organization:
            <input type="text" value={alignment} onChange={(e) => setAlignment(e.target.value)} />
          </label>
          <label>
            About Me:
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Organization: {profile.alignment}</p>
          <p>About Me: {profile.bio}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
      <div>
        <h2>Favorites</h2>
        {favorites && favorites.length > 0 ? (
          favorites.map((favorite) => (
            <div key={favorite.result_id}>
              <h3>{favorite.name || favorite.result_name}</h3>
              <p>{favorite.description || favorite.result_description}</p>
              <img src={favorite.image || favorite.result_image} alt={favorite.name || favorite.result_name} 
              onError={(e) => e.target.src = 'default-image-url.jpg'} />
              <button onClick={() => handleRemoveFavorite(favorite.result_id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>Your vault is currently empty. Good Hunting.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;