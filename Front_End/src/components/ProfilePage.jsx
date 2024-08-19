import React, { useEffect, useState } from 'react';
import axiosInstance from './api/axios';

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
            console.error('Failed to fetch profile', error,
            error.response ? error.response.data : error.message);
          }
      };

  	const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('favorites/favorites/');
        setFavorites(response.data.favorites_result);
      } catch (error) {
        console.error('Failed to fetch favorites', error.response ? 
          error.response.data : error.message);
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

  if (!profile) {
    return <div>Loading...</div>;
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
      						<p>About Me:{profile.bio}</p>
									<button onClick={() => setEditing(true)}>Edit</button>
      					</div>
						)}
        				<h2>Favorites</h2>
        				{favorites.length > 0 ? (
          			favorites.map((favorite) => (
            			<div key={favorite.id}>
              			<h3>{favorite.result.name}</h3>
              			<p>{favorite.result.description}</p>
              			<img src={favorite.result.image} alt={favorite.result.name} />
										<button onClick={() =>
											handleRemoveFavorite(favorite.id)}>Remove</button>
            			</div>
          	))
        			) : (
          			<p>Your vault is currently empty. Good Hunting.</p>
      	)}
  		</div>
		)};

export default ProfilePage