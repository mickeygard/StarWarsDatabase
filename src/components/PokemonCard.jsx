import { useOutletContext } from "react-router-dom";
import { isAlreadyOnTeam, catchPokemon, releasePokemon } from "../utilities/pokemonUtilities";

export default function PokemonCard(props) {

    const { pokemonData } = props;
    const [pokemonTeam, setPokemonTeam] = useOutletContext();

    return (
        <div className={`pokemon-card type-${pokemonData.type}`}>
            <h3>{pokemonData.name}</h3>
            <img src={pokemonData.imgUrl} />
            <div className="moves-grid">
                {pokemonData.moves.map((move, index) => (
                    <div key={index}>{move}</div>
                ))}
            </div>
            {isAlreadyOnTeam(pokemonData, pokemonTeam) ? (
                <button
                    onClick={() => releasePokemon(pokemonData, pokemonTeam, setPokemonTeam)}
                >Release</button>
            ) : (
                <button
                    onClick={() => catchPokemon(pokemonData, pokemonTeam, setPokemonTeam)}
                    disabled={pokemonTeam.length === 6}
                >Catch</button>
            )}
        </div>
    );
}