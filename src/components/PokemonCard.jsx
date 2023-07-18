import { useOutletContext } from "react-router-dom";

export default function PokemonCard(props) {
  const { pokemonData } = props;
  const [pokemonTeam, setPokemonTeam] = useOutletContext();

  const name = pokemonData.name;
  const imgUrl = pokemonData.sprites.front_default;
  const type = pokemonData.types[0].type.name;
  const moves = pokemonData.moves.slice(0, 4).map((move) => move.move.name);

  // return true if pokemon is already on the team, else false
  function isAlreadyOnTeam(toCompare) {
    return pokemonTeam.some((pokemon) => pokemon.name === toCompare.name);
  }

  // adds pokemon to team if not caught yet
  function catchPokemon(toCatch) {
    const updatedTeam = [...pokemonTeam];
    updatedTeam.push(toCatch);
    setPokemonTeam(updatedTeam);
  }

  // releases pokemon from team if already caught
  function releasePokemon(toRelease) {
    const updatedTeam = [...pokemonTeam];
    const indexToRemove = pokemonTeam.findIndex(
      (pokemon) => pokemon.name === toRelease.name
    );
    updatedTeam.splice(indexToRemove, 1);
    setPokemonTeam(updatedTeam);
  }

  return (
    <div className={`pokemon-card bg-color-${type}`}>
      <h3>{name}</h3>
      <img src={imgUrl} />
      <div className="moves">
        {moves.map((move, index) => (
          <div key={index}>{move}</div>
        ))}
      </div>
      {isAlreadyOnTeam(pokemonData) ? (
        <button onClick={() => releasePokemon(pokemonData)}>Release</button>
      ) : (
        <button
          onClick={() => catchPokemon(pokemonData)}
          disabled={pokemonTeam.length === 6}
        >
          Catch
        </button>
      )}
    </div>
  );
}
