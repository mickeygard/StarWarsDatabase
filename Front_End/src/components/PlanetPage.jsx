import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const PlanetPage = () => {
  const [planet, setPlanet] = useState([]);

  useEffect(() => {
    console.log('useEffect is running'); // Confirm useEffect is running

    const getPlanet = async () => {
      try {
        const response = await axios.get('http https://swapi.dev/api/planets/');
        console.log('API response:', response.data.results); // Debug log
        setPlanet(response.data.results);
      } catch (error) {
        console.error('Error fetching Planet data:', error);
      }
    };

    getPlanet();
  }, []);

  return (
    <div>
      <h5>Planets</h5>
      {planet.length ? (
        <ol>
          {planet.map((data, i) => (
            <li key={i}>
              <Link to={`/planet/${data.name}`} className="planet-link">
                {data.name}
              </Link>
            </li>
          ))}
        </ol>
        ) : (
          <div>No Planets found</div>
      )}
    </div>
  )
};

export default PlanetPage;