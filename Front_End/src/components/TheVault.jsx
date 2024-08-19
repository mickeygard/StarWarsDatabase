import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from './FavoritesContext'
import './vault.css';

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
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
    const navigate = useNavigate();

    const fetchData = useCallback(async (category, setData, page) => {
        try {
            setLoading(prevLoading => ({ ...prevLoading, [category]: true }));
            const response = await axios.get
                (`https://starwars-databank-server.vercel.app/api/v1/${category}?page=${page}&limit=20`);
            setData(prevData => {
                const newData = response.data.data.filter(item => !prevData.some(existingItem => 
                existingItem._id === item._id));
                return [...prevData, ...newData];
            });
            setLoading(prevLoading => ({ ...prevLoading, [category]: false }));
        } catch (error) {
            console.error(`Error fetching ${category} data`, error);
            setLoading(prevLoading => ({ ...prevLoading, [category]: false }));
        }
    }, []);

            // // useCallback is a React hook that returns a memoized version of the callback function. 
            // This means that the function will only be recreated if one of its dependencies changes. 
            // In this case, the dependencies array is empty ([]), so the function will only be created once.
            // // Function Parameters:
            // // category: The category of data to fetch (e.g., characters, films, etc.).
            // // setData: A function to update the state with the fetched data.
            // // page: The page number to fetch.
            // // Setting Loading State:
            // // setLoading(prevLoading => ({ ...prevLoading, [category]: true })): This sets the loading 
            // state for the specific category to true, indicating that data is being fetched.
            // // Fetching Data:
            // // const response = await axios.get(...): This makes an HTTP GET request to the specified URL 
            // using Axios. The URL includes the category and page number as query parameters.
            // // Updating State with Fetched Data:
            // // setData(prevData => [...prevData, ...response.data.data]): This updates the state with the 
            // fetched data by appending the new data to the existing data.
            // // Resetting Loading State:
            // // setLoading(prevLoading => ({ ...prevLoading, [category]: false })): This sets the loading 
            // state for the specific category to false, indicating that data fetching is complete.
            // // Error Handling:
            // // If an error occurs during the data fetching process, it is caught in the catch block, and 
            // an error message is logged to the console. The loading state is also reset to false for the 
            // specific category.
            // // In summary, this function fetches data from an API, updates the state with the fetched data, 
            // and manages the loading state for the specific category. The useCallback hook ensures that the 
            // function is only recreated if its dependencies change.
    
    useEffect(() => {
        fetchData('characters', setCharacters, 1);
        fetchData('droids', setDroids, 1);
        fetchData('creatures', setCreatures, 1);
        fetchData('locations', setLocations, 1);
        fetchData('organizations', setOrganizations, 1);
        fetchData('species', setSpecies, 1);
        fetchData('vehicles', setVehicles, 1);
    }, [fetchData]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const filmsResponse = await axios.get('https://swapi.dev/api/films'); 
                setFilms(filmsResponse.data.results);

                const planetsResponse = await axios.get('https://swapi.dev/api/planets');
                setPlanets(planetsResponse.data.results);
            } catch (error) {
                console.error('Error fetching initial data', error);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        Object.keys(page).forEach(category => {
            fetchData(category, eval(`set${category.charAt(0).toUpperCase() + category.slice(1)}`), page[category]);
        });
    }, [page, fetchData]);

    const handleResultClick = (category, id) => {
        navigate(`/${category}/${id}`);
    };

    const handleScroll = (e, category) => {
        if (e.target.scrollWidth - e.target.scrollLeft === e.target.clientWidth && !loading
            [category]) {
            setPage(prevPage => ({ ...prevPage, [category]: prevPage[category] + 1 }));
        }
    };

    const scrollLeft = (ref) => {
        ref.current.scrollBy({ left: -1000, behavior: 'smooth' });
    };

    const scrollRight = (ref) => {
        ref.current.scrollBy({ left: 1000, behavior: 'smooth' });
    };

    const renderCategory = (title, data, category, setData) => {
        const rowRef = useRef(null);

        if (!Array.isArray(data)) {
            console.error(`Expected an array for ${category}, but got:`, data);
            return null;
        }


        return (
            <div className="category">
                <div className="title">{title}</div>
                <button className="arrow arrow-left" onClick={() => scrollLeft(rowRef)}>&lt;</button>
                <div className="scrolling-row" ref={rowRef} onScroll={(e) => 
                    handleScroll(e, category, setData)}>
                    {data.map((item, index) => (
                        <div key={`${category}-${page[category]}-${item._id || item.url}-${index}`} 
                        className="item" onClick={() => handleResultClick
                        (category, item._id || item.url)}>
                            <img src={item.image || item.url} alt={item.name || item.title} />
                            <p>{item.name || item.title}</p>
                            <button onClick={() => favorites.some(fav => fav.id === item._id) ? 
                                removeFromFavorites(item) : addToFavorites(item)}>
                                {favorites.some(fav => fav.id === item._id) ? '★' : '☆'}
                            </button>
                        </div>
                    ))}
                </div>
                <button className="arrow arrow-right" onClick={() => scrollRight(rowRef)}>&gt;
                </button>
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