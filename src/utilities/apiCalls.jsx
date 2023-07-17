import axios from "axios";

export const getPokemonList = () => {
    return axios.get("https://pokeapi.co/api/v2/pokemon?limit=30");
};