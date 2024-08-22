import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap'
import { FavoritesContext } from './FavoritesContext';
import './InformationalPage.css'


const InformationalPage = ({ category }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { favorites, addToFavorites, removeFromFavorites } = useContext
	(FavoritesContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get
  				(`https://starwars-databank-server.vercel.app/api/v1/${category}/${id}`);
         setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

  	fetchData();
  }, [category, id]);

  if (!data) {
    return <div>Loading...</div>;
  }

	const isFavorite = favorites.some((fav) => fav.result_id === data._id);

	const handleFavoriteButtonClick = () => {
			if (isFavorite) {
					removeFromFavorites(data);
			} else {
					addToFavorites(data);
			}
	};

  return (
    <div className="informational-page">
      <h1>{data.name || data.title}</h1>
      {data.image && <img src={data.image} alt={data.name || data.title} />}
      <div className="info-box">
        <p>{data.description}</p>
          {/* Add more fields as needed */}
      </div>
			<button className="button"
        variant={isFavorite ? "danger" : "success"} 
        onClick={handleFavoriteButtonClick}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default InformationalPage;