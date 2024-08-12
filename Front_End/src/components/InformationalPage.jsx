import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InformationalPage = ({ category }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://starwars-databank-server.vercel.app/api/v1/${category}/${id}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [category, id]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{data.name || data.title}</h1>
            <p>{data.description}</p>
            {data.image && <img src={data.image} alt={data.name || data.title} />}
            {/* Add more fields as needed */}
        </div>
    );
};

export default InformationalPage;