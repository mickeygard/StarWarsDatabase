import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./components/HomePage.jsx";
import TheVault from "./components/TheVault.jsx";
import CreaturePage from "./components/CreaturePage.jsx";
import DroidPage from "./components/DroidPage.jsx";
import Favorites from "./components/Favorites.jsx";
import FilmsPage from "./components/FilmsPage.jsx";
import LocationPage from "./components/LocationPage.jsx";
import MissingResourcePage from "./components/MissingResourcePage.jsx";
import OrganizationPage from "./components/OrganizationPage.jsx";
import PlanetPage from "./components/PlanetPage.jsx";
import SpeciesPage from "./components/SpeciesPage.jsx";
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
        path: 'vault',
        element: <TheVault />
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
        element: <Favorites />
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
        path: 'vehicle',
        element: <VehiclePage />
      },
    ],
    errorElement: <Error404Page />
  }
]);
export default router;
