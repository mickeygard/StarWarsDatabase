import React, { useContext} from 'react';
import { Container, Row } from 'react-bootstrap';
import { TeamContext } from './TeamContext';
import PokemonCard from './PokemonCard'

function TeamPage() {
const { team } = useContext(TeamContext);

  return (
    <>
      <h2>My Pokemon Team</h2>
      <Container>
        <Row>
          {team.length ? (
            team.map((pokemon, i) => <PokemonCard key={i} data={pokemon} />)
          ) : (
            <h3>No Pokemon Caught Yet</h3>
          )}
        </Row>
      </Container>
    </>
  );
};

export default TeamPage