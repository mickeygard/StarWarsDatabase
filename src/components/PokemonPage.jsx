import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PokemonCard from './PokemonCard';

function PokemonPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(response.data);
      } catch (error) {
        console.error("Error fetching Pokemon data;", error)
      }
    }

    fetchPokemon();
  }, [name]);

  if (!pokemon) {
    return <div>Loading...</div>
  }
  
  return (
    <> 
    <br></br>
    <h2>{pokemon.name}</h2>
    <br></br>
    <PokemonCard data={pokemon} />
  </>
);
}


  //   <> 
  //   <br></br>
  //   <h2>{pokemon.name}</h2>
  //   <br></br>
  //   <div className={`pokemon-card ${getPokemonTypeClass(pokemon.types[0].type.name)}`}>
  //     <h3>{pokemon.name}</h3>
  //     <img src= {pokemon.sprites.front_default} alt={pokemon.name} />
  //     <div className= "moves">
  //       {pokemon.moves.slice(0, 4).map((move, index) => (
  //         <span key= {index}>{move.move.name}</span>
  //       ))}
  //     </div>
  //   </div>
  // </>

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
  
  export default PokemonPage;