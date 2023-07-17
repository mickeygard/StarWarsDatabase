import { useOutletContext } from "react-router-dom";
import PokemonCard from "./PokemonCard";

export default function TeamPage() {
    const [pokemonTeam] = useOutletContext();

    return (
        <div className="main-page-contents">
            <h2>My Pokemon Team</h2>
            {pokemonTeam.length > 0 ? (
                <div className="team-grid">
                    {pokemonTeam.map((pokemon, index) => (
                        <PokemonCard key={index} pokemonData={pokemon} />
                    ))}
                </div>
            ) : (
                <h3>No Pokemon Caught Yet</h3>
            )
            }
        </div>
    );
}