import React from 'react';
import "../index.css";


const HomePage = ({ isActive }) => {

  
  const backgroundStyles = {
    backgroundImage: 'url("src/components/images/4lanscapes.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box'
  };

  const boxStyles = {
    backgroundColor: 'rgba(128, 128, 128, 0.7)', // Gray with 50% transparency
    color: 'black',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    maxWidth: '80%',
    margin: '0 auto'
  };

  return (
    <div style={backgroundStyles}>
     <div style={boxStyles}>
      <h3>This page was created to fill a gap in information found on the leading Star Wars APIs. I found 
        that there was a need to consolidate the information that can be found on the web into one resource,
        and this is how I've chosen to do it. Each page will show a list of resources that fall under that 
        category, with a search bar set to search that category only.
      </h3>
    </div>
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