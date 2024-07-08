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
        console.log(response.data);
        setPokemon(response.data);
      } catch (error) {
        console.error("Error fetching Pokemon data;", error)
      }
    }

    fetchPokemon();
  }, [name]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
    <br />
    <h2>{pokemon.name}</h2>
    <br />
    <PokemonCard data={pokemon} />
  </>
);
}

  export default PokemonPage;