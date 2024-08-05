import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const DroidPage = () => {
  const [droid, setDroid] = useState([]);

  useEffect(() => {
    console.log('useEffect is running'); // Confirm useEffect is running

    const getDroid = async () => {
      try {
        const response = await axios.get('https://starwars-databank-server.vercel.app/api/v1/droids');
        console.log('API response:', response.data.results); // Debug log
        setDroid(response.data.results);
      } catch (error) {
        console.error('Error fetching droid data:', error);
      }
    };

    getDroid();
  }, []);


  const backgroundStyles = {
    backgroundImage: 'url("src/components/images/Jawa Sandcrawler.jpg")',
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
      <h5>Droids</h5>
        <div>No droids found</div>
    </div>
    </div>
  )
};

export default DroidPage;