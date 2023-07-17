import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx';
import HomePage from './components/HomePage.jsx';
import PokemonPage from "./components/PokemonPage.jsx";
import TeamPage from "./components/TeamPage.jsx";
import Error404Page from "./components/Error404Page.jsx";
import NoSuchPokemonPage from "./components/NoSuchPokemonPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "pokemon/:pokemonNameOrId",
                element: <PokemonPage />
            },
            {
                path: "team",
                element: <TeamPage />,
            },
            {
                path: "noSuchPokemonPage/:pokemonNameOrId",
                element: <NoSuchPokemonPage />
            }
        ],
        errorElement: <Error404Page />
    },
]);

export default router;