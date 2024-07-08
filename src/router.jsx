import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./components/HomePage.jsx";
import PokemonPage from "./components/PokemonPage.jsx";
import TeamPage from "./components/TeamPage.jsx";
import Error404Page from "./components/Error404Page.jsx";
import MissingPokemonPage from "./components/MissingPokemonPage.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'pokemon/:name',
        element: <PokemonPage />
      },
      {
        path: 'team',
        element: <TeamPage />
      },
    ],
  },
  {
    path: 'missingpokemon',
    element: <MissingPokemonPage />
  },
  {
    path: '*',
    element: <Error404Page />
  },
]);

export default router;
