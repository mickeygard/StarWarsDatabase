import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";


function PokemonCard({ data }) {
    const navigate = useNavigate()
    const navigateToPokemonPage = () => navigate(`./PokemonPage/${data.id}`)
    console.log(data);
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
        <Card className={`pokemon-card ${getPokemonTypeClass(data.type)}`}>
            <Card.Img variant="top" src={data.image} />
            <Card.Body>
              <Card.Title>{data.name}</Card.Title>
              <Link to={`/pokemon/${data.name}`}>
                <button>Capture</button>
              </Link>
            </Card.Body>
        </Card>
      );
    }

export default PokemonCard