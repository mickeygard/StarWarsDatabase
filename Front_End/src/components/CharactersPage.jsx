import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const CharactersPage = ({isActive}) => {
  const [characters, setCharacters] = useState([]);
  const [limit, setLimit] = useState(10); // Default limit
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // To manage the number of pages
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://starwars-databank-server.vercel.app/api/v1/characters`, {
          params: {
            limit: limit,
            page: page
          }
        });
        console.log('API response:', response.data); // Log the full response for debugging

        if (response.data && response.data.data) {
          setCharacters(response.data.data);
          setTotalPages(Math.ceil(response.data.info.total / limit)); // Update total pages
        } else {
          setError('Unexpected response structure');
          setCharacters([]);
        }
      } catch (error) {
        setError('Error fetching character data');
        setCharacters([]); // Ensure characters is an array
      } finally {
        setLoading(false);
      }
    };

    getCharacters();
  }, [limit, page]);


  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };

  const handlePageChange = (direction) => {
    if(direction === 'next' && page < totalPages) {
      setPage(page + 1);
    } else if (direction === 'prev' && page > 1) {
      setPage(page -1);
    }
  }

  if (loading) {
    return <div>Gathering Midichlorians...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const backgroundStyles = {
    backgroundImage: 'url("src/components/images/Star_Wars_Characters.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box'
  };

  const boxStyles = {
    backgroundColor: 'rgba(128, 128, 128, 0.7)', // Gray with 50% transparency
    color: 'black',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    maxWidth: '80%',
    margin: '0 auto'
  };

  const listStyles = {
    listStyleType: 'none',
    padding: 0
  };

  const listItemStyles = {
    margin: '10px 0'
  };

  const linkStyles = {
    color: 'black',
    textDecoration: 'none'
  };
  
  return (
    <div style={backgroundStyles}>
      <div style={boxStyles}>
        <h5>Characters</h5>
        <label htmlFor="limit">Show: </label>
        <select id="limit" value={limit} onChange={handleLimitChange}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
        </select>
        <ul style={listStyles}>
          {characters.map((character) => (
          <li key={character.id} style={listItemStyles}>
            <Link to={`/uniquecharacters/${character.id}`} style={linkStyles}>{character.name}</Link>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => handlePageChange('prev')} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        <button onClick={() => handlePageChange('next')} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
    </div>
  )};

export default CharactersPage;