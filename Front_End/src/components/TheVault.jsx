import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './vault.css'; // Add CSS for styling

const Vault = () => {
    const [films, setFilms] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [droids, setDroids] = useState([]);
    const [creatures, setCreatures] = useState([]);
    const [locations, setLocations] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [species, setSpecies] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [planets, setPlanets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const filmsResponse = await axios.get('https://swapi.dev/api/films'); // Replace with your films API endpoint
                setFilms(filmsResponse.data.results);

                const charactersResponse = await axios.get('https://starwars-databank-server.vercel.app/api/v1/characters');
                setCharacters(charactersResponse.data.data);

                const droidsResponse = await axios.get('https://starwars-databank-server.vercel.app/api/v1/droids');
                setDroids(droidsResponse.data.data);

                const creaturesResponse = await axios.get('https://starwars-databank-server.vercel.app/api/v1/creatures');
                setCreatures(creaturesResponse.data.data);

                const locationsResponse = await axios.get('https://starwars-databank-server.vercel.app/api/v1/locations');
                setLocations(locationsResponse.data.data);

                const organizationsResponse = await axios.get('https://starwars-databank-server.vercel.app/api/v1/organizations');
                setOrganizations(organizationsResponse.data.data);

                const speciesResponse = await axios.get('https://starwars-databank-server.vercel.app/api/v1/species');
                setSpecies(speciesResponse.data.data);

                const starshipsResponse = await axios.get('https://swapi.dev/api/starships');
                setStarships(starshipsResponse.data.results);

                const vehiclesResponse = await axios.get('https://starwars-databank-server.vercel.app/api/v1/vehicles');
                setVehicles(vehiclesResponse.data.data);

                const planetsResponse = await axios.get('https://swapi.dev/api/planets');
                setPlanets(planetsResponse.data.results);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const handleResultClick = (category, id) => {
        navigate(`/${category}/${id}`);
    };

    const renderCategory = (title, data, category) => {
        if (!Array.isArray(data)) {
            console.error(`Expected an array for ${category}, but got:`, data);
            return null;
        }

        return (
            <div className="category">
                <h2>{title}</h2>
                <div className="scrolling-row">
                    {data.map((item) => (
                        <div key={item._id || item.url} className="item" onClick={() => handleResultClick(category, item._id || item.url)}>
                            <img src={item.image || item.url} alt={item.name || item.title} />
                            <p>{item.name || item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="vault">
            {renderCategory('Films', films, 'films')}
            {renderCategory('Characters', characters, 'characters')}
            {renderCategory('Droids', droids, 'droids')}
            {renderCategory('Creatures', creatures, 'creatures')}
            {renderCategory('Locations', locations, 'locations')}
            {renderCategory('Organizations', organizations, 'organizations')}
            {renderCategory('Species', species, 'species')}
            {renderCategory('Starships', starships, 'starships')}
            {renderCategory('Vehicles', vehicles, 'vehicles')}
            {renderCategory('Planets', planets, 'planets')}
        </div>
    );
};

export default Vault;