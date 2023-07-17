import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header(props) {
    const { teamSize = 0 } = props;

    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const onClickSearchHandler = () => {
        if (searchValue.length > 0) {
            navigate(`/pokemon/${searchValue}`);
        }
        setSearchValue("");
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onClickSearchHandler();
        }
    }

    return (
        <nav>
            <h1>POKEDEX</h1>
            <Link to="/">Home</Link>
            <Link to="/team">{`My Team #${teamSize}`}</Link>
            <input
                placeholder="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={onClickSearchHandler}>Search</button>
        </nav>
    )
}
