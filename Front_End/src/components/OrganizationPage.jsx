import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const OrganizationPage = () => {
  const [organization, setOrganization] = useState([]);

  useEffect(() => {
    console.log('useEffect is running'); // Confirm useEffect is running

    const getOrganization = async () => {
      try {
        const response = await axios.get('https://starwars-databank-server.vercel.app/api/v1/organizations');
        console.log('API response:', response.data.results); // Debug log
        setOrganization(response.data.results);
      } catch (error) {
        console.error('Error fetching Organization data:', error);
      }
    };

    getOrganization();
  }, []);

  return (
    <div>
      <h5>Organizations</h5>
      {location.length ? (
        <ol>
          {organization.map((data, i) => (
            <li key={i}>
              <Link to={`/organization/${data.name}`} className="organization-link">
                {data.name}
              </Link>
            </li>
          ))}
        </ol>
        ) : (
          <div>No Organizations found</div>
      )}
    </div>
  )
};

export default OrganizationPage;