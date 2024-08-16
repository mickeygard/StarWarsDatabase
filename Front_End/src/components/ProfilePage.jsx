import React, { useEffect, useState } from 'react';
import axiosInstance from './api/axios';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('profile/profiles/<int:pk>/');
                setProfile(response.data);
            } catch (error) {
                console.error('Failed to fetch profile', error,
                error.response ? error.response.data : error.message);
            }
        };

        const fetchFavorites = async () => {
            try {
                const response = await axiosInstance.get('favorites/');
                setFavorites(response.data.favorites_result);
            } catch (error) {
                console.error('Failed to fetch favorites', error, 
                  error.response ? error.response.data : error.message);
            }
        };

        fetchProfile();
        fetchFavorites();
    }, []);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{profile.user?.username || 'Unknown User'}</h1>
            <p>Organization: {profile.organization_alignment || 'N/A'}</p>
            <p>{profile.bio || 'No bio available'}</p>
            <div>
                <h2>Favorites</h2>
                {favorites.length > 0 ? (
                    favorites.map((favorite) => (
                        <div key={favorite.id}>
                            <h3>{favorite.result.name}</h3>
                            <p>{favorite.result.description}</p>
                            <img src={favorite.result.image} alt={favorite.result.name} />
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