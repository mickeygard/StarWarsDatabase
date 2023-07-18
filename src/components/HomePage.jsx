import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    async function getPokemonList() {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=30"
      );
      setPokemonList(response.data.results);
    }

    getPokemonList();
  }, []);

  return (
    <div className="main-page-contents">
      <h2>Home</h2>
      <ol>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>
            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
