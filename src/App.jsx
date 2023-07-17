import { useState } from "react";
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export default function App() {
  const [pokemonTeam, setPokemonTeam] = useState([]);

  return (
    <>
      <Header teamSize={pokemonTeam.length} />
      <Outlet context={[pokemonTeam, setPokemonTeam]} />
    </>
  )
}
