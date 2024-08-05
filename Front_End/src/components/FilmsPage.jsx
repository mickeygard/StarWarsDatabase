import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const FilmsPage = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    console.log('useEffect is running'); // Confirm useEffect is running

    const getFilms = async () => {
      try {
        const response = await axios.get('http https://swapi.dev/api/films/');
        console.log('API response:', response.data.results); // Debug log
        setFilms(response.data.results);
      } catch (error) {
        console.error('Error fetching film data:', error);
      }
    };

    getFilms();
  }, []);

  const backgroundStyles = {
    backgroundImage: 'url("src/components/images/9movies.avif")',
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

  return (
    <div style={backgroundStyles}>
    <div>
      <h5>Films</h5>
    </div>
    </div>
  )
};

export default FilmsPage;