import React, { useContext} from 'react';
import { Container, Row } from 'react-bootstrap';
import CharacterCard from './UniqueCharactersPage'

function FavoritesPage() {
const { favorites } = useContext(FavoritesContext);

  return (
    <>
      <h2>My Favorites</h2>
      <Container>
        <Row>
          {favorites.length ? (
            favorites.map((resource, i) => <CharacterCard key={i} data={resource} />)
          ) : (
            <h3>No favorites added yet</h3>
          )}
        </Row>
      </Container>
    </>
  );
};

export default FavoritesPage