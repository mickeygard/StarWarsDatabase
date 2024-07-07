import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';


function MyNavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchQuery.trim() === '') return;

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
      navigate(`/pokemon/${searchQuery.toLowerCase()}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        navigate('/missingpokemon');
      } else {
        navigate('/error404');
      }
    }
  };


  return (
    <Navbar bg="light" expand="lg">
      {/* <Navbar.Brand href="/">POKEDEX</Navbar.Brand> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <h1>POKEDEX</h1>
      <Nav.Link as={Link} to='/'>Home</Nav.Link>
      <Nav.Link as={Link} to='/team'>My Team #0</Nav.Link>
        <Form inline="true" onSubmit={handleSearch} className="ml-auto">
          <FormControl
            type="text"
            placeholder="search"
            className="mr-sm-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavBar
