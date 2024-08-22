import React, { useEffect, useState } from 'react';
import axiosInstance from './api/axios';
import axios from 'axios';
import "./ProfilePage.css"

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
      // edited fetchFavorites so that there was not an API useCallback, there are calls for saved information on favorites
    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('profile/favorites/');
        const favoritesData = response.data.map(favorite => ({
          id: favorite.result_id,
          name: favorite.result_name,
          description: favorite.result_description,
          image: favorite.result_image
        }));
        setFavorites(favoritesData);
        console.log('Favorites data:', favoritesData)
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
    <div className="background4">
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
        <h2>Favorites</h2>
          <div classname="grid-container2">
            <div className="grid-item inputs">
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
    </div>
  );
};

export default ProfilePage;