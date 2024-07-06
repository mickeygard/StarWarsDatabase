import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function MyNavBar() {
  return (
<Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand as={Link} to='/'>Home</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"> 
            <br></br><h1>POKEDEX</h1><br></br>
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/team'>My Team #0</Nav.Link>
            <form className="navbar-form navbar-left" action="/action_page.php">
      <div className="form-group">
        <input type="text" className="form-control" placeholder="search"/>
      </div>
      <button type="search" className="btn btn-default">Search</button>
    </form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar
