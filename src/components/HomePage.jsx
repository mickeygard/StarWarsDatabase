import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPokemonList } from "../utilities/apiCalls";

export default function HomePage() {

    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        getPokemonList().then((response) => {
            setPokemonList(response.data.results);
        });
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
    )
}
