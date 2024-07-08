import React, { useContext } from 'react';
import { Card, Button } from "react-bootstrap";
import { TeamContext } from './TeamContext';


function PokemonCard({ data }) {
    const { team, addToTeam, removeFromTeam } = useContext(TeamContext);

    const isInTeam = team.some((p) => p.name === data.name);
    const isTeamFull = team.length >= 6;

    const handleTeamButtonClick = () => {
      if (isInTeam) {
        removeFromTeam(data);
      } else {
        addToTeam(data);
      }
    };
    
    const getPokemonTypeClass = (type) => {
      switch (type) {
        case 'normal': return 'bg-color-normal';
        case 'fire': return 'bg-color-fire';
        case 'water': return 'bg-color-water';
        case 'grass': return 'bg-color-grass';
        case 'electric': return 'bg-color-electric';
        case 'ice': return 'bg-color-ice';
        case 'fighting': return 'bg-color-fighting';
        case 'poison': return 'bg-color-poison';
        case 'ground': return 'bg-color-ground';
        case 'flying': return 'bg-color-flying';
        case 'psychic': return 'bg-color-psychic';
        case 'bug': return 'bg-color-bug';
        case 'rock': return 'bg-color-rock';
        case 'ghost': return 'bg-color-ghost';
        case 'dragon': return 'bg-color-dragon';
        case 'dark': return 'bg-color-dark';
        case 'steel': return 'bg-color-steel';
        case 'fairy': return 'bg-color-fairy';
        default: return '';
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
              <Button 
                variant={isInTeam ? "danger" : "success" } 
                onClick={handleTeamButtonClick}
                disabled={isTeamFull}
              >
                {isInTeam ? "Release" : "Catch"}  
              </Button>
            </Card.Body>
        </Card>
      );
    };

export default PokemonCard