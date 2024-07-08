import React from 'react';
import { useLocation } from "react-router-dom";


function MissingPokemonPage() {
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || '';

  return (
    <div>
      <p>No such pokemon with name or id '{searchQuery}' exists!</p>
    </div>
  )
}

export default MissingPokemonPage