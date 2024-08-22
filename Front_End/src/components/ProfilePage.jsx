import React, { useEffect, useState } from 'react';
import axiosInstance from './api/axios';
import axios from 'axios';
import { Card, Button } from "react-bootstrap"
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

  const handleRemoveFavorite = async (id) => {
    try {
      console.log('Removing favorite with result_id:', id);
      await axiosInstance.delete(`profile/favorites/delete/${id}/`);
      setFavorites(favorites.filter(fav => fav.id !== id));
    } catch (error) {
      console.error('Failed to remove favorite', error, error.response ? error.response.data : error.message);
    }
  };

  if (!profile) {
    return <div>No Profile Info Found</div>;
  }

  return (
    <div className="background4">
      <h2 className="profile-username">{profile.username?.username}</h2>
        {editing ? (
        <div className="info">
          <label className="info-label">
            Organization:
            <input type="text" value={alignment} onChange={(e) => setAlignment(e.target.value)} className="info-input" />
          </label>
          <label className="info-label">
            About Me:
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="info-textarea" />
          </label>
          <button onClick={handleSave} className="info-button save-button">Save</button>
          <button onClick={() => setEditing(false)} className="info-button cancel-button">Cancel</button>
        </div>
        ) : (
        <div className="info-display">
          <p className="info-text1">Organization:</p>
          <p className="info-text">{profile.alignment}</p>
          <p className="info-text1">About Me:</p>
          <p className="info-text">{profile.bio}</p>
          <button onClick={() => setEditing(true)} className="info-button edit-button">Edit</button>
        </div>
        )}
          <h2 className="fav">Favorites</h2>
          <div className="grid-item inputs">
            {favorites && favorites.length > 0 ? (
              favorites.map((favorite) => (
                <Card key={favorite.result_id || favorite.id} className="favorite-card">
                  <Card.Body>
                    <Card.Title>{favorite.name || favorite.result_name}</Card.Title>
                      <Card.Img 
                        variant="top" 
                        src={favorite.image || favorite.result_image} 
                        alt={favorite.name || favorite.result_name}  
                      />
                      <Card.Text>{favorite.description || favorite.result_description}</Card.Text>
                      <Button variant="danger" onClick={() => handleRemoveFavorite(favorite.id)}>
                        Remove
                      </Button>
                  </Card.Body>
                </Card>
              ))
          ) : (
            <p className="none">Your vault is currently empty. Good Hunting.</p>
          )}
        </div>
      </div>
  );
};

export default ProfilePage;