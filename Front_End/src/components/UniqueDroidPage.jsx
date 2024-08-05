import React, { useContext } from 'react';
import { Card, Button } from "react-bootstrap";
import { FavoritesContext } from './FavoritesContext';


function DroidCard({ data }) {
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

    const isInFavorites = favorites.some((p) => p.name === data.name);
    const isFavoritesFull = favorites.length >= 25;

    const handleFavoritesButtonClick = () => {
      if (isInFavorites) {
        removeFromFavorites(data);
      } else {
        addToFavorites(data);
      }
    };

    return (
        <Card className={`pokemon-card ${getPokemonTypeClass(data.types[0].type.name)}`}>
            <img src= {data.sprites.front_default} alt={data.name} />
            <Card.Body>
              <h3>{data.name}</h3>
              <div className="moves">
                    {data.moves.slice(0, 4).map((move, index) => (
                        <div key={index}>{move.move.name}</div>
                    ))}
              </div>
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

export default DroidCard