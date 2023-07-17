import { useState } from "react";
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  const [pokemonTeam, setPokemonTeam] = useState([]);

  return (
    <>
      <Navbar teamSize={pokemonTeam.length} />
      <Outlet context={[pokemonTeam, setPokemonTeam]} />
    </>
  )
}
