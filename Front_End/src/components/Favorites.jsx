import React, { useContext} from 'react';
import { Container, Row } from 'react-bootstrap';

function Results() {
const { result } = useContext(ResultContext);

  return (
    <>
      <h2>Categories</h2>
      <Container>
        <Row>
          {result.length ? (
            vault.map((result, i) => <CharacterCard key={i} data={resource} />)
          ) : (
            <h3>No favorites added yet</h3>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Results