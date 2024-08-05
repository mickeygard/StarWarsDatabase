import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const VehiclePage = () => {
  const [vehicle, setVehicle] = useState([]);

  useEffect(() => {
    console.log('useEffect is running'); // Confirm useEffect is running

    const getVehicle = async () => {
      try {
        const response = await axios.get('https://starwars-databank-server.vercel.app/api/v1/vehicles');
        console.log('API response:', response.data.results); // Debug log
        setSpecies(response.data.results);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };

    getVehicle();
  }, []);

  return (
    <div>
      <h5>Vehicles</h5>
      {vehicle.length ? (
        <ol>
          {vehicle.map((data, i) => (
            <li key={i}>
              <Link to={`/vehicle/${data.name}`} className="vehicle-link">
                {data.name}
              </Link>
            </li>
          ))}
        </ol>
        ) : (
          <div>No vehicles found</div>
      )}
    </div>
  )
};

export default VehiclePage;