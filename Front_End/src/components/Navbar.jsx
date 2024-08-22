import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container, Form, FormControl, Button, Row, Col } 
    from 'react-bootstrap';
import { FavoritesContext } from './FavoritesContext';
import { AuthContext } from './AuthContext';
import './Navbar.css'


function MyNavBar() {
  const { favorites } = useContext(FavoritesContext);
  const { logout } = useContext(AuthContext);
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

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/loginsignup'); // Navigate to the login/signup page
  };


  return (
    <Navbar>
      <div className="background0">
        <Container>
        <div className="grid-container0">
          <div className="grid-item0">
            <h1>Star Wars Database</h1>
          </div>
          <div className="grid-item buttons0">
            <Button as={Link} to="/" variant="primary" className="m-2 home-button">
            Home
            </Button>
            <Button as={Link} to="/vault" variant="primary" className="m-2 vault-button">
            The Vault
            </Button>
            <Button as={Link} to="/profilepage" variant="primary" className="m-2 profile-button">
            Profile
            </Button>
            <Button as={Link} to="/loginsignup" variant="primary" className="m-2 login-button">
            Log In / Sign Up
            </Button>
            <Button onClick={handleLogout} variant="primary" className="m-2 logout-button">
            Logout
            </Button>
          </div>
        </div>
        </Container>
      </div>
    </Navbar>
  );
}

export default MyNavBar;