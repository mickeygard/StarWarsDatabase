import React, { createContext, useState } from 'react';


const TeamContext = createContext();

const TeamProvider = ({children}) => {
  const [team, setTeam] = useState([]);

  const addToTeam = (pokemon) => {
    if (team.length < 6 && !team.some((p) => p.name === pokemon.name)) {
      setTeam([...team, pokemon]);
    }
  };

  const removeFromTeam = (pokemon) => {
    setTeam(team.filter((p) => p.name !== pokemon.name));
  };

  return (
    <TeamContext.Provider value={{ team, addToTeam, removeFromTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export { TeamContext, TeamProvider }