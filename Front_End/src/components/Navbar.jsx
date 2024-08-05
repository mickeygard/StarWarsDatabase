import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';
import { FavoritesContext } from './FavoritesContext';


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
          <h1>Star Wars Data Hub</h1><br />
          {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand><br /> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to='/'>Home</Nav.Link>
          
          <Nav.Link as={Link} to='/favorites'>Favorites {`#${favorites.length}`}</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
             
              <NavDropdown.Item as={Link} to='/characters'>Characters</NavDropdown.Item>
              
              <NavDropdown.Item as={Link} to='/creatures'>Creatures</NavDropdown.Item>
              
              <NavDropdown.Item as={Link} to='/droids'>Droids</NavDropdown.Item>
              
              <NavDropdown.Item as={Link} to='/films'>Films</NavDropdown.Item>
              
              <NavDropdown.Item as={Link} to='/locations'>Locations</NavDropdown.Item>
              
              <NavDropdown.Item as={Link} to='/organizations'>Organizations</NavDropdown.Item> 
              
              <NavDropdown.Item as={Link} to='/planets'>Planets</NavDropdown.Item> 
              
              <NavDropdown.Item as={Link} to='/species'>Species</NavDropdown.Item> 
              
              <NavDropdown.Item as={Link} to='/vehicle'>Vehicles</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
          <Form onSubmit={handleSearch} className="ml-auto">
            <FormControl
              type="text"
              placeholder="May the force be with you"
              className="mr-sm-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="outline-success" id="search-button" data-testid="search-button">
              Search
            </Button>
          </Form>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;