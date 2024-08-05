import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./components/HomePage.jsx";
import CharacterPage from "./components/CharactersPage.jsx";
import CreaturePage from "./components/CreaturePage.jsx";
import DroidPage from "./components/DroidPage.jsx";
import FavoritesPage from "./components/FavoritesPage.jsx";
import FilmsPage from "./components/FilmsPage.jsx";
import LocationPage from "./components/LocationPage.jsx";
import MissingResourcePage from "./components/MissingResourcePage.jsx";
import OrganizationPage from "./components/OrganizationPage.jsx";
import PlanetPage from "./components/PlanetPage.jsx";
import SpeciesPage from "./components/SpeciesPage.jsx";
import UniqueCharactersPage from "./components/UniqueCharactersPage.jsx";
import UniqueCreaturePage from "./components/UniqueCreaturePage.jsx";
import UniqueDroidPage from "./components/UniqueDroidPage.jsx";
import UniqueFilmsPage from "./components/UniqueFilmsPage.jsx";
import UniqueLocationPage from "./components/UniqueLocationPage.jsx";
import UniqueOrganizationPage from "./components/UniqueOrganizationPage.jsx";
import UniquePlanetPage from "./components/UniquePlanetPage.jsx";
import UniqueSpeciesPage from "./components/UniqueSpeciesPage.jsx";
import UniqueVehiclePage from "./components/UniqueVehiclePage.jsx";
import VehiclePage from "./components/VehiclePage.jsx"
import Error404Page from "./components/Error404Page.jsx";


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
        path: 'characters',
        element: <CharacterPage />
      },
      {
        path: 'creatures',
        element: <CreaturePage />
      },
      {
        path: 'droids',
        element: <DroidPage />
      },
      {
        path: 'favorites',
        element: <FavoritesPage />
      },
      {
        path: 'films',
        element: <FilmsPage />
      },
      {
        path: 'locations',
        element: <LocationPage />
      },
      {
        path: 'missingresource',
        element: <MissingResourcePage />
      },
      {
        path: 'organizations',
        element: <OrganizationPage />
      },
      {
        path: 'planets',
        element: <PlanetPage />
      },
      {
        path: 'species',
        element: <SpeciesPage />
      },
      {
        path: 'uniquecharacters',
        element: <UniqueCharactersPage />
      },
      {
        path: 'uniquecreature',
        element: <UniqueCreaturePage />
      },
      {
        path: 'uniquedroid',
        element: <UniqueDroidPage />
      },
      {
        path: 'uiquefilms',
        element: <UniqueFilmsPage />
      },
      {
        path: 'uniquelocations',
        element: <UniqueLocationPage />
      },
      {
        path: 'uniqueorganizations',
        element: <UniqueOrganizationPage />
      },
      {
        path: 'uniqueplanet',
        element: <UniquePlanetPage />
      },
      {
        path: 'uniquespecies',
        element: <UniqueSpeciesPage />
      },
      {
        path: 'uniquevehicle',
        element: <UniqueVehiclePage />
      },
      {
        path: 'vehicle',
        element: <VehiclePage />
      },
    ],
    errorElement: <Error404Page />
  }
]);
export default router;
