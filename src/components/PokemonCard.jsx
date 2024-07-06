import React from 'react'
import { useNavigate } from 'react-router-dom';


function PokemonCard({ data }) {
    const navigate = useNavigate()
    const navigateToPokemonPage = () => navigate(`./PokemonPage/${data.id}`)
    console.log(data);
    return (
        <Card className="m-4 shadow-lg" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={data.image} />
            <Card.Body className="bg-purple-900">
                <Card.Title className="text-black font-extrabold">{data.name}</Card.Title>
                <Card.Text>
                    <h6 className="text-black">Name: {data.name}</h6>
                    <h6 className="text-black">Species: {data.type}</h6>
                </Card.Text>
                <Button variant="primary" onClick={navigateToPokemonPage}>Learn More</Button>
            </Card.Body>
        </Card>
    );
}

export default PokemonCard