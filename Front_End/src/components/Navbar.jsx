import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container, Form, FormControl, Button, Row, Col } 
    from 'react-bootstrap';
import { FavoritesContext } from './FavoritesContext';
import './Navbar.css'


function MyNavBar() {
  const { favorites } = useContext(FavoritesContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchQuery.trim() === '') return;

    try {
      const response = await axios.get(`https://starwars-databank-server.vercel.app/api/v1/characters${searchQuery.toLowerCase()}`);
      navigate(`/characters/${searchQuery.toLowerCase()}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        navigate('/missingresource', { state: { searchQuery } });
      } else {
        navigate('/error404');
      }
    }
    setSearchQuery('');
  };

  return (
<Navbar expand="lg" className="bg-body-tertiary">
    <Container>
        <Row className="w-100">
            <Col xs={12} className="text-center">
                <h1>Star Wars Data Hub</h1>
            </Col>
        </Row>
        <Row className="w-100 mt-3 nav-buttons">
            <Col xs={12} className="text-center">
                <Button as={Link} to="/" variant="primary" className="m-2">Home</Button>
                <Button as={Link} to="/vault" variant="primary" className="m-2">The Vault</Button>
                <Button as={Link} to="/profilepage" variant="primary" className="m-2">Profile</Button>
                <Button as={Link} to="/loginsignup" variant="primary" className="m-2">Log In / Sign Up</Button>
            </Col>
        </Row>
        <Row className="w-100 mt-3 nav-buttons">
            <Col xs={12}>
                <Form onSubmit={handleSearch} className="d-flex justify-content-end">
                    <FormControl
                        type="text"
                        placeholder="Good Hunting"
                        className="mr-sm-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" variant="outline-success" id="search-button" data-testid="search-button">
                        Search
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container>
</Navbar>
);
}

export default MyNavBar;