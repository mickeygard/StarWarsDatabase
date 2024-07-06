import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const HomePage = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    console.log('useEffect is running'); // Confirm useEffect is running

    const getPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=30');
        console.log('API response:', response.data.results); // Debug log
        setPokemon(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    getPokemon();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <h5>Pokemon</h5>
      {pokemon.length ? (
        <ol>
          {pokemon.map((data, i) => (
            <li key={i}>
              <Link to={`/pokemon/${data.name}`} className="pokemon-link">
                {data.name}
              </Link>
            </li>
          ))}
        </ol>
        ) : (
          <div>No Pokémon found</div>
      )}
    </div>
  )
};

export default HomePage;
































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Row } from 'react-bootstrap';
// import App from '../App';
// import MyNavBar from './Navbar';
// import PokemonCard from './PokemonCard';

// const HomePage = () => {
//   const [pokemon, setPokemon] = useState([]);
//   const [showPokemon, setShowPokemon] = useState(false);

//   useEffect(() => {
//     console.log('useEffect is running'); // Confirm useEffect is running
//     const getPokemon = async () => {
//       try {
//         const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=30');
//         console.log('API response:', response.data.results); // Debug log
//         setPokemon(response.data.results);
//       } catch (error) {
//         console.error('Error fetching Pokémon data:', error);
//       }
//     };

//     getPokemon();
//   }, []);

//   return (
//     <>
//       <App />
//       <MyNavBar />
//       <div className="home-page-contents">
//         <h2>Home</h2>
//         <ol>
//           <li>htre</li>
//         </ol>
//         <button onClick={() => setShowPokemon(!showPokemon)}>
//           {showPokemon ? 'Hide Pokémon' : 'Show Pokémon'}
//         </button>
//         {showPokemon && (
//           <>
//             <h2>Pokemon</h2>
//             <Container>
//               <Row>
//                 {pokemon.length ? (
//                   pokemon.map((data, i) => <PokemonCard key={i} data={data} />)
//                 ) : (
//                   <div>No Pokémon found</div>
//                 )}
//               </Row>
//             </Container>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default HomePage;