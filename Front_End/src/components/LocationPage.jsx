import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const LocationPage = () => {
  const [location, setLocation] = useState([]);

  useEffect(() => {
    console.log('useEffect is running'); // Confirm useEffect is running

    const getLocation = async () => {
      try {
        const response = await axios.get('https://starwars-databank-server.vercel.app/api/v1/locations');
        console.log('API response:', response.data.results); // Debug log
        setLocation(response.data.results);
      } catch (error) {
        console.error('Error fetching Location data:', error);
      }
    };

    getLocation();
  }, []);

  return (
    <div>
      <h5>Locations</h5>
      {location.length ? (
        <ol>
          {location.map((data, i) => (
            <li key={i}>
              <Link to={`/location/${data.name}`} className="location-link">
                {data.name}
              </Link>
            </li>
          ))}
        </ol>
        ) : (
          <div>No locations found</div>
      )}
    </div>
  )
};

export default LocationPage;