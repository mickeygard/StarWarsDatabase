import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import { pokemonDataParser } from "../utilities/pokemonUtilities";


export default function PokemonPage() {

    const { pokemonNameOrId } = useParams();
    const navigate = useNavigate();
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        const getPokemonData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
                const parsedPokemonData = pokemonDataParser(response.data);
                setPokemonData(parsedPokemonData);
            } catch (error) {
                console.error(error);
                navigate(`/noSuchPokemonPage/${pokemonNameOrId}`);
            }
        };

        getPokemonData();
    }, [pokemonNameOrId]);

    return (
        <div className="main-page-contents">
            {pokemonData && (
                <>
                    <h2>{pokemonData.name}</h2>
                    <PokemonCard pokemonData={pokemonData} />
                </>
            )}
        </div>
    )
}
