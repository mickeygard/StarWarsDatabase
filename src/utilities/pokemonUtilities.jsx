export function pokemonDataParser(rawData) {
    const name = rawData.name;
    const imgUrl = rawData.sprites.front_default;
    const type = rawData.types[0].type.name;
    const moves = rawData.moves.slice(0, 4).map((move) => move.move.name);

    return {
        name,
        imgUrl,
        type,
        moves
    };
}

// return true if pokemon is already on the team, else false
export function isAlreadyOnTeam(pokemonInQuestion, pokemonTeam) {
    return pokemonTeam.some(pokemon => pokemon.name === pokemonInQuestion.name);
}

// adds pokemon to team if not caught yet
export function catchPokemon(pokemonToCatch, pokemonTeam, setPokemonTeam) {
    const updatedTeam = [...pokemonTeam];
    updatedTeam.push(pokemonToCatch);
    setPokemonTeam(updatedTeam);
}

// releases pokemon from team if already caught
export function releasePokemon(pokemonToRelease, pokemonTeam, setPokemonTeam) {
    const updatedTeam = [...pokemonTeam];
    const indexToRemove = pokemonTeam.findIndex((pokemon) => pokemon.name === pokemonToRelease.name);
    updatedTeam.splice(indexToRemove, 1);
    setPokemonTeam(updatedTeam);
}
