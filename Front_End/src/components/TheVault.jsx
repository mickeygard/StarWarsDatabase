import React, { useEffect, useState, useCallback } from 'react';
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
    const [vehicles, setVehicles] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [page, setPage] = useState({
        characters: 1,
        droids: 1,
        creatures: 1,
        locations: 1,
        organizations: 1,
        species: 1,
        vehicles: 1,
    });
    const [loading, setLoading] = useState({
        characters: false,
        droids: false,
        creatures: false,
        locations: false,
        organizations: false,
        species: false,
        vehicles: false,
    });
    const navigate = useNavigate();

    const fetchData = useCallback(async (category, setData, page) => {
        try {
            setLoading(prevLoading => ({ ...prevLoading, [category]: true }));
            const response = await axios.get(`https://starwars-databank-server.vercel.app/api/v1/${category}?page=${page}`);
            setData(prevData => [...prevData, ...response.data.data]);
            setLoading(prevLoading => ({ ...prevLoading, [category]: false }));
        } catch (error) {
            console.error(`Error fetching ${category} data`, error);
            setLoading(prevLoading => ({ ...prevLoading, [category]: false }));
        }
    }, []);

    useEffect(() => {
        fetchData('characters', setCharacters, page.characters);
        fetchData('droids', setDroids, page.droids);
        fetchData('creatures', setCreatures, page.creatures);
        fetchData('locations', setLocations, page.locations);
        fetchData('organizations', setOrganizations, page.organizations);
        fetchData('species', setSpecies, page.species);
        fetchData('vehicles', setVehicles, page.vehicles);
    }, [fetchData, page]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const filmsResponse = await axios.get('https://swapi.dev/api/films'); // Replace with your films API endpoint
                setFilms(filmsResponse.data.results);

                const planetsResponse = await axios.get('https://swapi.dev/api/planets');
                setPlanets(planetsResponse.data.results);
            } catch (error) {
                console.error('Error fetching initial data', error);
            }
        };

        fetchInitialData();
    }, []);

    const handleResultClick = (category, id) => {
        navigate(`/${category}/${id}`);
    };

    const handleScroll = (e, category, setData) => {
        if (e.target.scrollWidth - e.target.scrollLeft === e.target.clientWidth && !loading[category]) {
            setPage(prevPage => ({ ...prevPage, [category]: prevPage[category] + 1 }));
            fetchData(category, setData, page[category] + 1);
        }
    };

    const renderCategory = (title, data, category, setData) => {
        if (!Array.isArray(data)) {
            console.error(`Expected an array for ${category}, but got:`, data);
            return null;
        }

        return (
            <div className="category">
                <div className="title">{title}</div>
                <div className="scrolling-row" onScroll={(e) => handleScroll(e, category, setData)}>
                    {data.map((item, index) => (
                        <div key={`${category}-${page[category]}-${item._id || item.url}-${index}`} className="item" onClick={() => handleResultClick(category, item._id || item.url)}>
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
            {renderCategory('Films', films, 'films', setFilms)}
            {renderCategory('Characters', characters, 'characters', setCharacters)}
            {renderCategory('Droids', droids, 'droids', setDroids)}
            {renderCategory('Creatures', creatures, 'creatures', setCreatures)}
            {renderCategory('Locations', locations, 'locations', setLocations)}
            {renderCategory('Organizations', organizations, 'organizations', setOrganizations)}
            {renderCategory('Species', species, 'species', setSpecies)}
            {renderCategory('Vehicles', vehicles, 'vehicles', setVehicles)}
            {renderCategory('Planets', planets, 'planets', setPlanets)}
        </div>
    );
};

export default Vault;