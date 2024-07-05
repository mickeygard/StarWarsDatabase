import React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import App from '../App'
import MyNavBar from './Navbar'


function HomePage() {
  return (
  <>
  <App/>
  <MyNavBar/>
    <div className="home-page-contents">
    </div>
    <h2>Home</h2>
  </> 
 )
};


function getPokemon() {
  const [pokemon, setPokemon] = useState({})
  const { id } = useParams()
  console.log(id)
  useEffect(()=>{
      const getPokemon = async () => {
          const response = await axios.get(`https://pokeapi.co/api/v2/`)
          console.log(response.data)
          setPokemon ([...pokemon, ...response.data.results]);
      }
      getPokemon()
  },[id])

console.log('pokemon is', pokemon)

if (pokemon.id === null){
  return <h2>Loading</h2>
}
return (
  <>
  <div className="flex justify-center items-center min-h-screen">
      <img src={pokemon.image} alt="image" />
      <h1>{pokemon.name}</h1>
      <div>{pokemon.is_main_series}</div>
      <div>{pokemon.generation}</div>
      <div>{pokemon.names}</div>
      <div>{pokemon.effect_entries}</div>
      <div>{pokemon.effect_changes}</div>
      <div>{pokemon.flavor_text_entries}</div>
      <div>{pokemon.type}</div>
  </div>
  </>
 )
};
// export default Pokemon







// function Pokemon() {
//   const [pokemon, setPokemon] = useState([])

//   useEffect(() => {
//     const getPokemon = async () => {
//     const response = await axios.get(
//       'https://pokeapi.co/api/v2/{endpoint}/'
//     );

        

//   getPokemon();

//     }, []);
//   };

//   console.log(pokemon);

export default HomePage()