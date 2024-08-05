import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const SpeciesPage = () => {
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    console.log('useEffect is running'); // Confirm useEffect is running

    const getSpecies = async () => {
      try {
        const response = await axios.get('https://starwars-databank-server.vercel.app/api/v1/species');
        console.log('API response:', response.data.results); // Debug log
        setSpecies(response.data.results);
      } catch (error) {
        console.error('Error fetching Species data:', error);
      }
    };

    getSpecies();
  }, []);

  return (
    <div>
      <h5>Species</h5>
      {species.length ? (
        <ol>
          {species.map((data, i) => (
            <li key={i}>
              <Link to={`/species/${data.name}`} className="species-link">
                {data.name}
              </Link>
            </li>
          ))}
        </ol>
        ) : (
          <div>No Species found</div>
      )}
    </div>
  )
};

export default SpeciesPage;