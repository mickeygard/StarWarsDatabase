import React, { useContext } from 'react';
import { Card, Button } from "react-bootstrap";
import { FavoritesContext } from './FavoritesContext';


function CharacterCard({ data }) {
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

    const isInFavorites = favorites.some((r) => r.name === data.name);
    const isFavoritesFull = favorites.length >= 30;

    const handleFavoritesButtonClick = () => {
      if (isInFavorites) {
        removeFromFavorites(data);
      } else {
        addToFavorites(data);
      }
    };
    

    return (
        <Card>
            <img src= {data.image} alt={data.name} />
            <Card.Body>
              <h3>{data.name}</h3>
              {/* <div "description">
                    {data.description => (
                    ))}
              </div> */}
              <br />
              <Button 
                variant={isInFavorites ? "danger" : "success" } 
                onClick={handleFavoritesButtonClick}
                disabled={isFavoritesFull}
              >
                {isInFavorites ? "Remove from Favorites" : "Add to Favorites"}  
              </Button>
            </Card.Body>
        </Card>
      );
    };

export default CharacterCard